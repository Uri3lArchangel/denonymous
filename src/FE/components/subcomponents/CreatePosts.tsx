"use client";

import { denonymousType } from "@/types";
import { Share2Icon, Trash2 } from "lucide-react";
import {ModalComponent} from "../libraries/antd";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { anonymousMessagePrompts } from "@/src/core/data/anonymousMessagePrompts";
import { platformHashtags } from "@/src/core/data/hashtags";
import { FaTelegram } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { Tooltip } from "antd";
import { changeDenonymousViewState, deleteDenonymousAction } from "@/src/BE/serverActions/actions";
import { useEdgeStore } from "@/src/core/lib/edgestore";


export const MyDenonyms = ({ posts }: { posts?: denonymousType[] }) => {
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState("0");
  const [topic,setTopic] = useState<string>()
  const [activeStateModal,setactiveStateModal]=useState(false)
  const {edgestore}  = useEdgeStore()
  const [deleteDenonymousModal,setDeleteDenonymousModal]=useState(false)
  const randomSelect = (a: string[]) => {
    const array = a;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const copyToClipboard = (a: string) => {
    navigator.clipboard.writeText(a);
  };
  const viewState=async()=>{

  }

  return (
    <section >
    <ul>

      {/* share denonymous link modal */}
      <ModalComponent title="share" setState={setModal} state={modal}>
        <div className="flex justify-around">
          <Link
            target="_blank"
            href={`https://api.whatsapp.com/send?text=${
              randomSelect(anonymousMessagePrompts) + "%0A%0A"
            }${link}&is_copy_url=false`}
            className="cursor-pointer"
          >
            <FaWhatsapp />
            <p>Whatsapp</p>
          </Link>
          <Link
            target="_blank"
            href={`https://twitter.com/intent/tweet?url=${
              link + "%0A%0A"
            }&text=${
              randomSelect(anonymousMessagePrompts) + "%0A%0A"
            }&hashtags=${randomSelect(platformHashtags)}`.replaceAll(
              "#",
              "%23"
            )}
            className="cursor-pointer"
          >
            <RiTwitterXLine />
            <p>Twitter</p>
          </Link>
          <div className="cursor-pointer">
            <FaInstagram />
            <p>Instagram</p>
          </div>
          <Link
            target="_blank"
            href={`https://t.me/share/url?url=${link}&text=${randomSelect(
              anonymousMessagePrompts
            )}`}
          >
            <FaTelegram />
            <p>telegram</p>
          </Link>
          <Link href={""}
            onClick={(e) => {
             e.preventDefault ;
              copyToClipboard(link);
              alert("link copied")
            }}
          >
            <CiLink />
            <p>Copy link</p>
          </Link>
        </div>
      </ModalComponent>
{/* share denonymous modal ends */}



      {posts
        ? posts.map((e, i) => (
          <li className="border-black px-8 border w-fit" key={i}>


             {/* selectable part */}
            <Tooltip title={e.isActive?"":"this denonymous is inactive"}>
            <Link  href={e.link} className={e.isActive?"border block hover:bg-green-100 border-black px-8  w-fit py-4":" hover:bg-green-100/60 block border-black px-8  w-fit py-4"} key={i}>
              topic:{e.topic} <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> responses:
              {e.replys.length} <br />
              </Link>
              </Tooltip>
              
              
              
              {/* share icon and link */}
              <p>
                {""}
                link: {e.isActive?e.link:"..."} <br />{" "}
                <Share2Icon
                  className="cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    setLink(e.link);
                  }}
                />
              </p>



              {/* checkbox and label */}
              <label
                className="cursor-pointer select-none"
                htmlFor="show_responses"
              >
                responses visible to others?
              </label>{" "}
              <input
                className="cursor-pointer"
                id="show_responses"
                type="checkbox"
                checked={e.responsesViewState}
              />
<ModalComponent key={i} title={e.isActive?"deactivate Denonymous":"activate Denonymous"} ok={async()=>{
changeDenonymousViewState(topic!);setactiveStateModal(false);
}} state={activeStateModal} setState={setactiveStateModal}>
<div>Are you sure you want to {e.isActive?"deactivte this denonymous, you would stop receiving responses from users, but still keep your messages":"activate your denonymous, users would now be able to send responses to you"} {e.topic}</div>
</ModalComponent>
              {/* change active state */}
<button className="bg-black text-white" onClick={()=>{setactiveStateModal(true);setTopic(e.topic);console.log(e.topic)}}>{e.isActive?"deactivate":"make active"}</button>


<ModalComponent key={i} state={deleteDenonymousModal} setState={setDeleteDenonymousModal} title="delete denonymous" ok={async()=>{
let a = await deleteDenonymousAction(topic!);
if(a){
for(let i=0;i<a.length;i++){
  for(let j=0;j<a[i].media.length;j++){
    await edgestore.denonymousMedia.delete({url:a[i].media[j].link})
  }
}
}

}}>
  <div className=" text-red-500">Are you sure you want to delete this denonymous?, this action cannot be undone !</div>
</ModalComponent>
<div className="flex cursor-pointer" onClick={()=>{  setTopic(e.topic);setDeleteDenonymousModal(true)
}}><Trash2 /><p>delete denonymous</p></div>

            </li>
          ))
        : [].map((e, i) => <li key={i}></li>)}
    </ul>
    </section>
  );
};
