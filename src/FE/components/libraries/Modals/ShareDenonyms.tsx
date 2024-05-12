'use client'
import React, { CSSProperties, useContext, useState } from 'react'
import { ModalComponent } from '../antd';
import Link from 'next/link';
import { anonymousMessagePrompts } from "@/src/core/data/anonymousMessagePrompts";
import { platformHashtags } from "@/src/core/data/hashtags";
import { FaTelegram } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { copyToClipboard } from '@/src/core/lib/helpers';
import { NotificationContext } from '../../contexts/NotificationContext';
export interface ModalStyles {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    wrapper?: CSSProperties;
    content?: CSSProperties;
  }

function ShareDenonymsModal({setModal,modal,link}:{modal:boolean,setModal:React.Dispatch<React.SetStateAction<boolean>>,link:string}) {
  const notification = useContext(NotificationContext)!  
  const randomSelect = (a: string[]) => {
      const array = a;
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
    const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"black"},header:{backgroundColor:"black"},content:{backgroundColor:"black",border:"1px solid #f6d108"},wrapper:{backgroundColor:"#0006"},footer:{backgroundColor:"black"}} as ModalStyles
  return (
    <ModalComponent styles={styles} ok={false} title={<p className='text-white'>share</p>} mask={true} setState={setModal}  state={modal}>
    <div className="flex flex-wrap w-full max-w-[800px] justify-center ">
      <div className='flex items-center justify-around w-fit space-x-5 mx-4 my-1'>
      <Link

        target="_blank"
        href={`https://api.whatsapp.com/send?text=${
          randomSelect(anonymousMessagePrompts) + "%0A%0A"
        }${encodeURI(link)}&is_copy_url=false`}
        className=" text-white hover:text-[#f6d108] flex flex-col items-center"
      >
        <FaWhatsapp size={20} />
        <p>Whatsapp</p>
      </Link>
      <Link
        target="_blank"
        href={`https://twitter.com/intent/tweet?url=${
          encodeURI(link) + "%0A%0A"
        }&text=${
          randomSelect(anonymousMessagePrompts) + "%0A%0A"
        }&hashtags=${randomSelect(platformHashtags)}`.replaceAll(
          "#",
          "%23"
        )}
        className=" text-white hover:text-[#f6d108] flex flex-col items-center"
      >
        <RiTwitterXLine size={20} />
        <p>Twitter</p>
      </Link>
      </div>
      <div className='flex items-center justify-around w-fit space-x-5 mx-4 my-1'>
      <Link
        target="_blank"
        href={`https://t.me/share/url?url=${encodeURI(link)}&text=${randomSelect(
          anonymousMessagePrompts
        )}`}
        className='hover:text-[#f6d108] text-white flex flex-col items-center'
      >
        <FaTelegram size={20} />
        <p>telegram</p>
      </Link>
      <Link href={""}
        className=" text-white hover:text-[#f6d108] flex flex-col items-center"
        onClick={(e) => {
         e.preventDefault() ;
          copyToClipboard(link);
          notification({
            type:"success"
            ,message:"Link Copied",
            description:""
          })
          
        }}
      >
        <CiLink size={20}/>
        <p>Copy link</p>
      </Link></div>
    </div>
  </ModalComponent>  )
}

export default ShareDenonymsModal