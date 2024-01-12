'use client'
import { replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";
import { MultiFileDropzoneUsage } from "./MultiFileComponent";
import style from '../../../../styles/styles.module.css'
import { Share2Icon } from "lucide-react";
import ModalComponent from "../libraries/antd";
import { CiLink } from "react-icons/ci";
import {render} from 'react-dom'
import * as htmlImages from 'html-to-image'
import Link from "next/link";

function VideoElement({ src, mimeType }:{src:string,mimeType:string}) {
  return (
    <video controls width={300} className=" object-cover h-[90%]" height={300} >
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

  const ss = async()=>{
   let node=  document.getElementById("content") as HTMLDivElement
   let data =await htmlImages.toJpeg(node)
   console.log(data)
    setImage(data)
  }
  const copyReplyLinkToClipBoard = (a:string)=>{
 
navigator.clipboard.writeText(a)
  }

  const [shareState,setShareState] = useState(false)
  const [index,setIndex]=useState(0)
  const [image,setImage]= useState('')
  return (
    <ul>
      {/* <div id="content" className="text-white text-2xl">hellooooooo</div>
      <Image src={image} alt="" width={500} height={500}/>
      <div onClick={()=>{
        let link =document.createElement("a") as HTMLAnchorElement;
        link.href=image;
        link.download = `image.png`
        link.click()

      }}>Download image</div>
      <button onClick={ss} className="bg-red-500">take ss</button> */}
{replys.map((e, n) => (
  <li id={`${n}`} key={n} className="py-20">
    anonymous user:
    <div className="">
    {e.media.map((mediaItem, index) => {
      let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
      if (mimeType === "image") {
        return(
          <div className="" key={index}> 
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
          <div className="" key={index}> 
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
          <div className="" key={index}> 
          <AudioElement  src={mediaItem.link} mimeType={mediaItem.mimeType} />
          </div>
          );
      } 
    })}
    </div>
    <p>{e.text}</p>
    <ModalComponent setState={setShareState} state={shareState} title="share response">
      <div className="flex cursor-pointer" onClick={
        ()=>{
          copyReplyLinkToClipBoard(window.location.origin+window.location.pathname+`#${index}`);
          setShareState(false)
        }
      } ><CiLink size={30} /></div>
    </ModalComponent>
    <Share2Icon className="cursor-pointer" onClick={
      ()=>{
        setIndex(n);
        setShareState(true)
      }
    } />
  </li>
))}

    </ul>
  );
}
