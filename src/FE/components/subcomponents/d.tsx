"use client";
import { imageFormats } from "@/src/core/lib/acceptableFilesFormats";
import { useEdgeStore } from "@/src/core/lib/edgestore";
import { replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";

export function Reply_Form() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileList | null>();
  const [audioFiles, setAudioFiles] = useState<FileList | null>();
  const [progress, setProgress] = useState(0);
  const [imageurls, setImageUrls] = useState<{
    url: string;
    thumbnailurl: string | null;
  }>();





  const maxSize = 60;
  const ByteToMB = 1048576;




  const removeFile = (K:number,type:"image"|"video"|"audio")=>{
    
    if(type == "image"){
    setImageFiles((prev)=>prev.filter((_,index)=>index != K))

    }
  }
  // UI Mods

  const selectFiles = (
    e: ChangeEvent<HTMLInputElement>,
    fileType: "image" | "audio" | "video"
  ) => {
    const files = e.target.files;
    let size = 0;
    if (files) {
      const count = files.length;
      for (let i = 0; i < count; i++) {
        let type = files[i].type;
        let items = [];
        size += files[i].size;
        if (fileType == "image") {
          if (!imageFormats.includes(type)) {
            // handle this error
            alert(
              `Invalid image format on image ${i}, supported formats include, png, jpeg, pdf, gif`
            );
            continue;
          }
          if (size / ByteToMB > maxSize) {
            // handle this error
            alert("Max total files size exceeded,max=60MB");
            return;
          }
          console.log(i, imageFiles);
          setImageFiles((prev) => [...prev, files[i]]);
        }
      }
    }
    // for(let file in files)
    // {
    //   file
    // }
  };

  // useEffect(()=>{

  // },[imageFiles])
  const { edgestore } = useEdgeStore();
  return (
    <form action="" >
      <label htmlFor="response" className="block ">
        Write a response
      </label>
      <textarea
        name="text_reply"
        id="response"
        cols={30}
        className="block border-2"
        rows={10}
      />

      {/* this is the div for everything image upload */}
      <div>
        <p>images preview</p>
        {/* we map over all image files provided and display a preview of all */}
        <div className="block">
          {imageFiles.map((e, n) => (
            <>
              <MdCancel size={30} key={n} className="cursor-pointer" onClick={()=>{
                removeFile(n,"image")
              }} />
              <Image
              key={n}
                src={URL.createObjectURL(e)}
                width={320}
                height={320}
                alt={e.name}
              />
            </>
          ))}
        </div>
        <label htmlFor="image_reply">add image</label>
        
        {/* this is the input for image upload */}
        <input
          className="border-2 mx-2"
          multiple
          id="image_reply"
          type="file"
          onChange={(e) => {
            selectFiles(e, "image");
          }}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (imageFiles) {
              
           for(let i=0;i<imageFiles.length;i++) { 
             const res = await edgestore.denonymousVideos.upload({
                file: imageFiles[i],
                onProgressChange(progress) {
                  setProgress(progress);
                },
              });
              // setImageUrls({
              //   url:res.url,
              //   thumbnailurl:res.thumbnailUrl
              // })
            }}
          }}
          className="border-2"
        >
          upload image(s)
        </button>
        <p>
          {imageurls?.url}+{imageurls?.thumbnailurl}
        </p>
      </div>

      <div>
        <label htmlFor="video_reply">add video</label>
        <input className="border-2 mx-2" id="video_reply" type="file" />
      </div>
      <div>
        <label htmlFor="audio_reply">add audio</label>
        <input className="border-2 mx-2" id="audio_reply" type="file" />
      </div>
      <button className="border-2 mx-2">Send response</button>
    </form>
  );
}

export function Replys({ replys }: { replys: replyModelType[] }) {
  return (
    <ul>
      {replys.map((e, n) => (
        <li key={n}>
          anonymous user:
          {e.imageAvailable ? (
            e.images.map((f, m) => <Image key={m} alt="img" src={f} />)
          ) : (
            <></>
          )}
          {e.videoAvailable ? (
            e.videos.map((f, m) => (
              <video controls>
                <source src={f.link} type={f.mimeType} />
              </video>
            ))
          ) : (
            <></>
          )}
          {e.audioAvailable ? (
            e.audios.map((f, m) => (
              <audio controls>
                <source src={f.link} type={f.mimeType} />
              </audio>
            ))
          ) : (
            <></>
          )}
          <p>{e.text}</p>
        </li>
      ))}
    </ul>
  );
}
