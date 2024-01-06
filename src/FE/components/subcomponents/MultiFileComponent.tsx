"use client";

import { MultiFileDropzone, type FileState } from "./MultiFileDropzone";
import { useEdgeStore } from "../../../core/lib/edgestore";
import { useEffect, useState } from "react";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { replyModelType } from "@/types";
import { revalidateTag } from "next/cache";
import { sendRelpyAction } from "@/src/BE/serverActions/actions";
import { useFormStatus } from "react-dom";

export function MultiFileDropzoneUsage({
  UUID,
  topic,
}: {
  UUID: string;
  topic: string;
}) {
  const [sending,setSending]=useState(false)
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [media, setMedia] = useState<{ link: string; mimeType: string }[]>([]);
  const { edgestore } = useEdgeStore();

  // const replySendFunction = async()=>{
  //   const text  = (document.getElementById("response") as HTMLTextAreaElement).value;
  //   const reply = {
  //     text,media
  //   } as replyModelType

  //   let res =await fetch(URLRESOLVE("/api/sendReply"),{method:"POST",mode:"no-cors",body:JSON.stringify({UUID,topic,reply})})
  //   console.log(res.status)
  //   if(res.status == 201){
  //     console.log(11)
  //   }
  //   else{
  //     // handle error
  //   }

  // }

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates((prev) => [...prev, ...addedFiles]);
        }}
      />
      <button
        onClick={async (e) => {
          e.preventDefault();
          await Promise.all(
            fileStates.map(async (addedFileState) => {
              try {
                const res = await edgestore.denonymousMedia.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });
                setMedia((prev) => [
                  ...prev,
                  { link: res.url, mimeType: addedFileState.file.type },
                ]);
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
        className="bg-green-500"
      >
        upload media
      </button>

      <button
      disabled={sending}
        className="border-2 mx-2"
        onClick={async (e) => {
          e.preventDefault();
          setSending(true)
          for (let i = 0; i < media.length; i++) {
            await edgestore.denonymousMedia.confirmUpload({
              url: media[i].link,
            });
          }
          // (document.getElementById("reply_form") as HTMLFormElement).submit()
          const text = (
            document.getElementById("response") as HTMLTextAreaElement
          ).value;
          const reply = {
            text,
            media,
          } as replyModelType;
          await sendRelpyAction(UUID, topic, reply);
          (document.getElementById("response") as HTMLTextAreaElement).value = "";
          setFileStates([])
          setMedia([])
          setSending(true)
        }}
      >
        Send response
      </button>
    </div>
  );
}
