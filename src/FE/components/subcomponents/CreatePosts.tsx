"use client";

import { denonymousType } from "@/types";
import { Share2Icon } from "lucide-react";
import ModalComponent from "../libraries/antd";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";



export const MyDenonyms = ({ posts }: { posts?: denonymousType[] }) => {
  const [modal,setModal]=useState(false)
  const share =()=>{

  }
  return (
    <ul>
      <ModalComponent setState={setModal} state={modal}>
        <div>
        <div><FaWhatsapp /><p>Whatsapp</p></div>
        <div><RiTwitterXLine /><p>Twitter</p></div>
        <div><FaInstagram /></div>

        </div>
      </ModalComponent>
      {posts
        ? posts.map((e, i) => (
            <li className="border border-black px-8  w-fit py-4" key={i}>
              topic:{e.topic} <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> responses:
              {e.replys.length} <br />
             <p id="share_link_denonymous"> link: {e.link} <br />{" "} <Share2Icon className="cursor-pointer" onClick={()=>{setModal(true)}} /></p>
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
              />
            </li>
          ))
        : [].map((e, i) => <li key={i}></li>)}
    </ul>
  );
};
