import React, { CSSProperties, useState } from 'react'
import { ModalComponent } from '../antd';
import Link from 'next/link';
import { anonymousMessagePrompts } from "@/src/core/data/anonymousMessagePrompts";
import { platformHashtags } from "@/src/core/data/hashtags";
import { FaTelegram } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
export interface ModalStyles {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    wrapper?: CSSProperties;
    content?: CSSProperties;
  }

function ShareDenonymsModal({setModal,modal,link}:{modal:boolean,setModal:React.Dispatch<React.SetStateAction<boolean>>,link:string}) {
    const randomSelect = (a: string[]) => {
      const array = a;
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
    const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#fff4",border:"1px solid #f6d108"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles
  return (
    <ModalComponent styles={styles} ok={false} title={<p className='text-white'>share</p>} mask={true} setState={setModal}  state={modal}>
    <div className="flex justify-around bg-transparent">
      <Link

        target="_blank"
        href={`https://api.whatsapp.com/send?text=${
          randomSelect(anonymousMessagePrompts) + "%0A%0A"
        }${encodeURI(link)}&is_copy_url=false`}
        className="cursor-pointer hover:text-[#f6d108]"
      >
        <FaWhatsapp />
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
        className="cursor-pointer hover:text-[#f6d108]"
      >
        <RiTwitterXLine />
        <p>Twitter</p>
      </Link>
      {/* <div className="cursor-pointer hover:text-[#f6d108]">
        <FaInstagram />
        <p>Instagram</p>
      </div> */}
      <Link
        target="_blank"
        href={`https://t.me/share/url?url=${encodeURI(link)}&text=${randomSelect(
          anonymousMessagePrompts
        )}`}
        className='hover:text-[#f6d108]'
      >
        <FaTelegram />
        <p>telegram</p>
      </Link>
      {/* <Link href={""}
        onClick={(e) => {
         e.preventDefault ;
          copyToClipboard(link);
          alert("link copied")
        }}
      >
        <CiLink />
        <p>Copy link</p>
      </Link> */}
    </div>
  </ModalComponent>  )
}

export default ShareDenonymsModal