"use client";

import { MultiFileDropzone, type FileState } from "./MultiFileDropzone";
import { useEdgeStore } from "../../../core/lib/edgestore";
import { useEffect, useState } from "react";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { replyModelType } from "@/types";
import { revalidateTag } from "next/cache";
import { sendRelpyAction } from "@/src/BE/serverActions/actions";
import { useFormStatus } from "react-dom";
import { AiFillPicture } from "react-icons/ai";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdOutlineAudioFile } from "react-icons/md";
import imageExtensions from '../../../core/data/imageValidExtensions.json'
import videoExtensions from '../../../core/data/videoValidExtensions.json'
import audioExtensions from '../../../core/data/audioValidExtensions.json'



export function MultiFileDropzoneUsage({
  username,
  topic,
}: {
  username: string;
  topic: string;
}) {
  const [sending,setSending]=useState(false)
  const [fileStates1, setFileStates1] = useState<FileState[]>([]);
  const [fileStates2, setFileStates2] = useState<FileState[]>([]);
  const [fileStates3, setFileStates3] = useState<FileState[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isTextAreaEmpty,setIsTextAreaEmpty] = useState(true)
  // const [mediaEmpty,setMediaEmpty] = useState(true)
  const [media, setMedia] = useState<{ link: string; mimeType: string }[]>([]);
  const { edgestore } = useEdgeStore();
  useEffect(()=>{
    const text = (
      document.getElementById("response") as HTMLTextAreaElement
    )
    text.addEventListener("keyup",()=>{
      if(text.value != ""){
            setIsTextAreaEmpty(false)
      }else{
        setIsTextAreaEmpty(true)

      }

    })
    if(fileStates.length > 0){
      setIsTextAreaEmpty(false)
    }else{
      setIsTextAreaEmpty(true)
    }
  },[fileStates,fileStates1,fileStates2,fileStates3])
  // const replySendFunction = async()=>{
  //   const text  = (document.getElementById("response") as HTMLTextAreaElement).value;
  //   const reply = {
  //     text,media
  //   } as replyModelType

  //   let res =await fetch(URLRESOLVE("/api/sendReply"),{method:"POST",mode:"no-cors",body:JSON.stringify({username,topic,reply})})
  //   console.log(res.status)
  //   if(res.status == 201){
  //     console.log(11)
  //   }
  //   else{
  //     // handle error
  //   }

  // }

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates1((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
    setFileStates2((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
    setFileStates3((fileStates) => {
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
    <div className="full_response_container_textarea">
             <div className='flex w-[60%] max-w-[300px]  md:h-fit justify-between mx-auto my-2 md:my-0 md:w-fit ' id="uploadMediaIcons">
     <label htmlFor="chick_a"><AiFillPicture  size={45} className="text-[#404040] cursor-pointer hover:text-[#ffdf00] md:mx-2"/></label>
     <label htmlFor="chick_b"><BsCameraVideoFill size={45} className="text-[#404040] cursor-pointer hover:text-[#ffdf00] md:mx-2" /></label>
     <label htmlFor="chick_c"><MdOutlineAudioFile size={45} className="text-[#404040] cursor-pointer hover:text-[#ffdf00] md:mx-2" /></label>
</div>
<div id="previewMediaContainer"
>
      <MultiFileDropzone
      id="chick_a"
      className="w-[90%] mx-auto hidden"
        value={fileStates1}
    
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
        onChange={(files) => {
          setFileStates1(files);

        }}
        dropzoneOptions={{accept:{"image/*":imageExtensions}}}

        onFilesAdded={async (addedFiles) => {

          setFileStates((prev) => [...prev, ...addedFiles]);

        }}
      
        
      />
        <MultiFileDropzone
        id="chick_b"
      className="w-[90%] mx-auto hidden"
      dropzoneOptions={{accept:{"video/*":videoExtensions}}}

        value={fileStates2}
        
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
         onChange={(files) => {
          setFileStates2(files);
        }}
        onFilesAdded={async (addedFiles) => {

          setFileStates((prev) => [...prev, ...addedFiles]);
        }}
      /> 
       <MultiFileDropzone
       id="chick_c"
      className="w-[90%] mx-auto hidden"
        value={fileStates3}
    
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
        dropzoneOptions={{accept:{"audio/*":audioExtensions}}}

        onChange={(files) => {
          setFileStates3(files);
        }}
        onFilesAdded={async (addedFiles) => {

          setFileStates((prev) => [...prev, ...addedFiles]);

        }}
      />
      </div>
    <div id="sendResponseContainer"
    className="flex flex-col justify-center items-center"
>
    <button
    disabled={ sending || isTextAreaEmpty}
        onClick={async (e) => {
          e.preventDefault();

          await Promise.all(
            fileStates.map(async (addedFileState) => {
              try {
                if(addedFileState.progress!="COMPLETE")
                {
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
              }} catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
        
        className={fileStates.length<1?"hidden ":`bg-green-500 block mx-auto w-[70%] h-[50px] mt-6 rounded-[10px] bg-transparent gradient_elements_text border-[#ffdf00] border-2`}
      > 
        upload media
      </button>

      <button
      disabled={sending || isTextAreaEmpty }
        className=" block mx-auto w-[70%] text-black h-[50px] mt-4 mb-10 md:my-2 gradient_elements_div rounded-[10px] md:w-[180px]"
        onClick={async (e) => {
          try{e.preventDefault();
          setSending(true)
          const text = (
            document.getElementById("response") as HTMLTextAreaElement
          ).value;
          const reply = {
            text,
            media,
          } as replyModelType;
          await sendRelpyAction(username, topic, reply);

          for (let i = 0; i < media.length; i++) {
            await edgestore.denonymousMedia.confirmUpload({
              url: media[i].link,
            });
          }
          // (document.getElementById("reply_form") as HTMLFormElement).submit()
         
          (document.getElementById("response") as HTMLTextAreaElement).value = "";
          setFileStates([])
          setMedia([])
          setSending(false)
        }catch(err:any){
          setFileStates([])
          setMedia([])
            setSending(false)
          }
        }}
      >
        Send response
      </button>
      </div>
    </div>
  );
}
