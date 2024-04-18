"use client";

import { denonymousType } from "@/types";
import Link from "next/link";
import styles from "@/styles/styles.module.css";
import React, { useContext, useEffect, useState } from "react";
import ShareDenonymsModal from "../libraries/Modals/ShareDenonyms";
import { Trash2Icon } from "lucide-react";
import { TooltipApp } from "../libraries/antd";
import DeleteDenonymsModal from "../libraries/Modals/DeleteDenonyms";
import ActivateDenonyms from "../libraries/Modals/ActivateDenonyms";
import Loading from "@/app/loading";
import { NotificationContext } from "../contexts/NotificationContext";
import ResponsesSVG from "../assets/ResponsesSVG";

export const MyDenonyms = ({ posts }: { posts?: denonymousType[] }) => {
  // const [isCopied, setIsCopied] = useState(false);
  const [modal, setModal] = useState(false);
  const [topic,setTopic] = useState<string>()
  const [deleteDenonymousModal,setDeleteDenonymousModal]=useState(false)
  const [activeStateModal,setactiveStateModal]=useState(false)
  const [link, setLink] = useState("0");
const [loading,setLoading]=useState(false)
const notification  = useContext(NotificationContext)!
useEffect(()=>{
  console.log(topic)
},[topic])
  const copyToClipboard = (a: string) => {
      navigator.clipboard.writeText(a);
    };

function handleClick(a:React.MouseEvent<HTMLInputElement>, i:number) {
    a.preventDefault();
    console.log(i);
    setTopic(posts![i].topic);
    setactiveStateModal(true);
}

  return (
    <>
{loading?    <Loading />:null
}    <ShareDenonymsModal link={link} modal={modal} setModal={setModal} />
    <DeleteDenonymsModal setLoading={setLoading} setModal={setDeleteDenonymousModal} modal={deleteDenonymousModal} topic={topic!} />

    <ul className="grid grid-cols-1 gap-4 mx-auto">
      {posts
        ? posts.map((e, i) => (

            <li 
            id={i.toString()}
              className={`border h-fit border-[#EDC211] px-8 text-white max-w-[100%] w-[30rem] rounded-lg  py-8 bg-[#242222] mx-auto `}
              key={i}
            >
              <h2 className="text-3xl font-bold text-center uppercase">
                <TooltipApp title={e.topic} text={e.topic} />
              </h2>
              {/* <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> */}
              <section className="flex items-center justify-between">
                <div className="relative w-[100px] h-[100px] flex items-center justify-center  mb-4">
                  <ResponsesSVG />
                  <p className={`${styles.gradientHeader} font-bold text-3xl absolute `}>
                    {e.replys.length > 100 ? "99+" : e.replys.length}
                  </p>
                </div>
                <TooltipApp text="" title="Disallow everyone from sending you responses">
                <div className="flex items-center">
                  <input
                    className="cursor-pointer mx-3"
                    id="show_responses"
                    type="checkbox"
                    checked={!e.isActive}
                    onClick={(a) => handleClick(a, i)}

                  />
                  <label
                    className="cursor-pointer select-none"
                    htmlFor="show_responses"
                  >

                    Disable Denonymous

                  </label>{" "}
                </div>
                </TooltipApp>
              </section>
              <div className="flex items-center justify-between">
                <Link href={e.link} target="blank">
                  <button
                    className={`${styles.signInBtn} rounded p-2 text-[#0f0f0f]`}
                  >
                    View Responses
                  </button>
                </Link>
                <div className="flex">
                  <button
                    className={` rounded-l px-4  border-[#EDC211] border-2 `}
                    onClick={ () => {
                     copyToClipboard(encodeURIComponent(e.link));
                      notification({
                        message:"Link copied",type:"success",
                        description:""
                      })
                    }}
                  >
                    <svg
                    className="copyIconSVG"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5705 0.872658C11.5705 0.757589 11.55 0.643656 11.5103 0.537416C11.4705 0.431176 11.4123 0.334728 11.3389 0.253622C11.2655 0.172517 11.1784 0.108355 11.0826 0.0648313C10.9868 0.0213074 10.8842 -0.000719691 10.7807 1.79307e-05H0.789813C0.686331 -0.000719691 0.58374 0.0213074 0.487945 0.0648313C0.392149 0.108355 0.305041 0.172517 0.231633 0.253622C0.158226 0.334728 0.0999687 0.431176 0.0602155 0.537416C0.0204623 0.643656 -2.126e-06 0.757589 1.65658e-10 0.872658V14.7902C-2.126e-06 14.9052 0.0204623 15.0192 0.0602155 15.1254C0.0999687 15.2316 0.158226 15.3281 0.231633 15.4092C0.305041 15.4903 0.392149 15.5545 0.487945 15.598C0.58374 15.6415 0.686331 15.6635 0.789813 15.6628C0.934287 15.6628 1.05141 15.5457 1.05141 15.4012V3.15795C1.05141 2.05338 1.94684 1.15794 3.05141 1.15794H11.2852C11.4428 1.15794 11.5705 1.03022 11.5705 0.872658Z"
                        fill="black"
                      />
                      <path
                        d="M12.8281 2.2373H2.76684C2.35008 2.2373 2.01224 2.61297 2.01224 3.07638V17.061C2.01224 17.5244 2.35008 17.9001 2.76684 17.9001H12.8281C13.2449 17.9001 13.5827 17.5244 13.5827 17.061V3.07638C13.5827 2.61297 13.2449 2.2373 12.8281 2.2373Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <button
                    className={` rounded-r px-4 py-2 text-[#0f0f0f] bg-[#EDC211]`}
                    onClick={()=>{
                      setLink(e.link);
                      setModal(true);
                    }}
                  >
                    {" "}
                    Share
                  </button>
                </div>
              </div>
              <Trash2Icon className="absolute top-5 right-10 cursor-pointer hover:text-[#f6d108] " onClick={()=>{ setTopic(e.topic);setDeleteDenonymousModal(true)
}} />

    <ActivateDenonyms setmodal={setactiveStateModal} modal={activeStateModal} topic={topic} e={e} key={i} />

            </li>
          ))
        : [].map((e, i) => <li key={i}></li>)}
    </ul>
    </>
  );
};