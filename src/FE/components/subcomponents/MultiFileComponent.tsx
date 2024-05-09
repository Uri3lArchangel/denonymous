"use client";

import { MultiFileDropzone, type FileState } from "./MultiFileDropzone";
import { useEdgeStore } from "../../../core/lib/edgestore";
import { useContext, useEffect, useState } from "react";
import { replyModelType } from "@/types";
import { AiFillPicture } from "react-icons/ai";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdOutlineAudioFile } from "react-icons/md";
import imageExtensions from '../../../core/data/imageValidExtensions.json'
import videoExtensions from '../../../core/data/videoValidExtensions.json'
import audioExtensions from '../../../core/data/audioValidExtensions.json'
import { NotificationContext } from "../contexts/NotificationContext";



export function MultiFileDropzoneUsage({
  username,
  key_,
  mediaLimit
}: {
  username: string;
  key_: string;
  mediaLimit: {
    audio: boolean;
    video: boolean;
    image: boolean;
  }
}) {
  const notification = useContext(NotificationContext)!
  const [sending,setSending]=useState(false)
  const [fileStates1, setFileStates1] = useState<FileState[]>([]);
  const [fileStates2, setFileStates2] = useState<FileState[]>([]);
  const [fileStates3, setFileStates3] = useState<FileState[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [canUpload,setCanUpload]=useState(false)
  const [isTextAreaEmpty,setIsTextAreaEmpty] = useState(true)
  const [mediaUploadComplete,setMediaUploadComplete]=useState(false)
  const [uploadedKeys,setUploadedKeys]=useState<string[]>([])
  // const [mediaEmpty,setMediaEmpty] = useState(true)
  const [media, setMedia] = useState<{ link: string; mimeType: string }[]>([]);
  const { edgestore } = useEdgeStore();

  useEffect(()=>{
    const text = (
      document.getElementById("response") as HTMLTextAreaElement
    )
    text.addEventListener("keyup",()=>{
      if(text.value != "" && fileStates.length== 0){
        setCanUpload(true)
      }
      if(text.value != "" || fileStates.length > 0){
            setIsTextAreaEmpty(false)
           
      }else{
        setIsTextAreaEmpty(true)

      }

    })
    if(fileStates.length > 0 || text.value != ""){
      setIsTextAreaEmpty(false)
    }else{
      setIsTextAreaEmpty(true)
    }
  },[fileStates,fileStates1,fileStates2,fileStates3])
 
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
    <div className="full_response_container_textarea ">
     <div className='flex w-[60%] max-w-[300px]  md:h-fit justify-between mx-auto my-2 md:my-0 md:w-fit ' id="uploadMediaIcons">
 <label  aria-disabled={sending || mediaLimit.image} htmlFor={`${sending || mediaLimit.image?"":"chick_a"}`} ><AiFillPicture disabled={sending || mediaLimit.image}   size={45} className={`text-[#404040]  hover:text-[#ffdf00] md:mx-2 ${mediaLimit.image?'cursor-not-allowed opacity-[0.6]':'cursor-pointer'}`}/></label>
   <label aria-disabled={sending || mediaLimit.video} htmlFor={`${sending ||mediaLimit.video ?"":"chick_b"}`}><BsCameraVideoFill  disabled={sending || mediaLimit.video} size={45} className={`text-[#404040]  hover:text-[#ffdf00] md:mx-2 ${mediaLimit.video?'cursor-not-allowed opacity-[0.6]':'cursor-pointer '}`} /></label>
    <label aria-disabled={sending || mediaLimit.audio} htmlFor={`${sending || mediaLimit.audio?"":"chick_c"}`}><MdOutlineAudioFile disabled={sending || mediaLimit.audio} size={45} className={`text-[#404040] hover:text-[#ffdf00] md:mx-2 ${mediaLimit.audio?'cursor-not-allowed opacity-[0.6]':'cursor-pointer'}`} /></label>
</div>
<div id="previewMediaContainer"
>
      <MultiFileDropzone
      id="chick_a"
      
      className="w-[90%] mx-auto hidden"
        value={fileStates1}
      disabled={sending || mediaLimit.image}
      
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
        onChange={(files) => {
          if(mediaLimit.image)return
          setFileStates1(files);
          setCanUpload(false)
          setMediaUploadComplete(false)


        }}
        dropzoneOptions={{accept:{"image/*":imageExtensions}}}

        onFilesAdded={async (addedFiles) => {
          if(mediaLimit.image)return
          setCanUpload(false)
          setFileStates((prev) => [...prev, ...addedFiles]);
          setMediaUploadComplete(false)

        }}
      
        
      />
        <MultiFileDropzone
        id="chick_b"
      disabled={sending || mediaLimit.video}

      className="w-[90%] mx-auto hidden"
      dropzoneOptions={{accept:{"video/*":videoExtensions}}}

        value={fileStates2}
        
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
         onChange={(files) => {
          if(mediaLimit.video)return
          setFileStates2(files);
          setCanUpload(false)
          setMediaUploadComplete(false)

        }}
        onFilesAdded={async (addedFiles) => {
          if(mediaLimit.video)return

          setCanUpload(false)
          setFileStates((prev) => [...prev, ...addedFiles]);
          setMediaUploadComplete(false)

        }}
      /> 
       <MultiFileDropzone
       id="chick_c"
      disabled={sending || mediaLimit.audio }

      className="w-[90%] mx-auto hidden "
        value={fileStates3}
    
        generalFileStateAction={fileStates}
        setGeneralFileStateAction={setFileStates}
        dropzoneOptions={{accept:{"audio/*":audioExtensions}}}

        onChange={(files) => {

          if(mediaLimit.audio)return
          setFileStates3(files);
          setCanUpload(false)
          setMediaUploadComplete(false)


        }}
        onFilesAdded={async (addedFiles) => {

          if(mediaLimit.audio)return

          setCanUpload(false)
          setFileStates((prev) => [...prev, ...addedFiles]);
          setMediaUploadComplete(false)


        }}
      />
      </div>
    <div id="sendResponseContainer"
    className="flex flex-col justify-center items-center "
>
    <button
    disabled={ sending || isTextAreaEmpty || mediaUploadComplete}
        onClick={async (e) => {
          e.preventDefault();
          setMedia([])
          setMediaUploadComplete(false)
          await Promise.all(
            fileStates.map(async (addedFileState) => {
              try {
                if(addedFileState.progress!="COMPLETE" && !uploadedKeys.includes(addedFileState.key))
                {
                  for(let i =0;i<media.length;i++){
                    let mime =media[i].mimeType
                    if(mediaLimit.image && mime.includes("image") ){
                      return
                    }
                    if(mediaLimit.video && mime.includes("video") ){
                      return
              
                    }
                    if(mediaLimit.audio && mime.includes("audio") ){
                      return
                    }
                   }
                  setSending(true)

                  const res = await edgestore.denonymousMedia.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                    
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                      setMediaUploadComplete(true)
                      setUploadedKeys((prev)=>[...prev,addedFileState.key])
                setSending(false)

                    }else{
          setMediaUploadComplete(false)

                    }
                  },
                });
                setMedia((prev) => [
                  ...prev,
                  { link: res.url, mimeType: addedFileState.file.type },
                ]);
                setCanUpload(true)

              }} catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
                setSending(false)

              }
            })
          );


        }}
        
        className={fileStates.length<1?"hidden ":`bg-green-500 block mx-auto w-[90%] h-[50px] mt-6 rounded-[10px] bg-transparent gradient_elements_text border-[#ffdf00] border-2`}
      > 
        upload media
      </button>

      <button
      disabled={(sending || isTextAreaEmpty || !canUpload) }
        className=" block mx-auto w-[90%] text-black h-[50px] mt-4 mb-10 md:my-2 gradient_elements_div rounded-[10px] md:w-[180px]"
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
          const sendRelpyAction =  ((await import("@/src/BE/serverActions/actions")).sendRelpyAction);

          await sendRelpyAction(username, key_, reply);

          for (let i = 0; i < media.length; i++) {
            await edgestore.denonymousMedia.confirmUpload({
              url: media[i].link,
            });
          }
          // (document.getElementById("reply_form") as HTMLFormElement).submit()
         
          (document.getElementById("response") as HTMLTextAreaElement).value = "";
          setFileStates([])
          setFileStates1([])
          setFileStates2([])
          setFileStates3([])
          setMedia([])
          setSending(false)
          notification({type:"success",message:"response sent",description:""})
        }catch(err:any){
          setFileStates([])
          setFileStates1([])
          setFileStates2([])
          setFileStates3([])
                setMedia([])
            setSending(false)
          notification({type:"success",message:err.message,description:""})

          }
        }}
      >
        Send response
      </button>
      </div>
    </div>
  );
}
