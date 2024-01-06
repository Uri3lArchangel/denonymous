import { replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";
import { MultiFileDropzoneUsage } from "./MultiFileComponent";
import style from '../../../../styles/styles.module.css'


function VideoElement({ src, mimeType }:{src:string,mimeType:string}) {
  return (
    <video controls width={300} height={300}>
      <source src={src} type={mimeType} />
    </video>
  );
}

function AudioElement({ src, mimeType }:{src:string,mimeType:string}) {
  return (
    <audio controls>
      <source src={src} type={mimeType} />
    </audio>

  );
}

function ImageElement({ src }:{src:string}) {
  return (
  <Image src={src} alt="" width={300} height={300} />
  );
}

export function Replys({ replys }: { replys: replyModelType[] }) {
  const replyRev = replys.reverse()
  return (
    <ul>
{replyRev.map((e, n) => (
  <li key={n}>
    anonymous user:
    <div className="">
    {e.media.map((mediaItem, index) => {
      let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
      if (mimeType === "image") {
        return(
          <div className="flex" key={index}> 
          <ImageElement  src={mediaItem.link}  />
          </div>
          );
      } 
    })}
    </div>
    <div className={style.replyVideoMedia}>
    {e.media.map((mediaItem, index) => {
      let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
      if (mimeType === "video") {
        return(
          <div className="video" key={index}> 
          <VideoElement  src={mediaItem.link} mimeType={mediaItem.mimeType} />
          </div>
          );
      } 
    })}
    </div>
    <div className={style.replyVideoMedia}>
    {e.media.map((mediaItem, index) => {
      let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
      if (mimeType === "audio") {
        return(
          <div className="flex" key={index}> 
          <AudioElement  src={mediaItem.link} mimeType={mediaItem.mimeType} />
          </div>
          );
      } 
    })}
    </div>
    <p>{e.text}</p>
    
  </li>
))}

    </ul>
  );
}
