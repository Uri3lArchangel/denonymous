"use client";
import { replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, Fragment, useContext, useEffect, useRef, useState } from "react";
import style from "../../../../styles/styles.module.css";
import { Download, DownloadIcon, PlayCircle, Share2Icon, XIcon, XOctagonIcon } from "lucide-react";
import {FloatButtonComponent, ModalComponent} from "../libraries/antd";
import { CiLink } from "react-icons/ci";
import styles from "../../../../styles/styles.module.css";
import Swiper from "swiper";
import {Navigation,Pagination} from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import WaveformComponent from "../libraries/Wavesurfer";
import { downloadMedia } from "@/src/core/lib/helpers";
import CreateDenonymousForm from "@/src/BE/components/CreateDenonymousForm";
import ReplyDenonymsScreen from "./ReplyDenonymsScreen";
import { useSession } from "../hooks/SessionHook";






export function Replys({ replys }: { replys: replyModelType[] }) {

const {user,session} = useSession()
// All states
  const [viewer,setViewerState]= useState<{img: {
    link: string;
    mimeType: string;
}[],display:boolean}>({img:[],display:false})
  const [shareState, setShareState] = useState(false);
  const [index, setIndex] = useState(0);
  const [initialSlide,setInitialSlide]=useState(0)
  const [selectedResponses,setSelectedResponses]=useState<string[]>([])
  const [reply,setReplyState]=useState(false)
  const [uname,setUname]=useState("")

  // internal functions
  const copyReplyLinkToClipBoard = (a: string) => {
    navigator.clipboard.writeText(a);
  };

const replySS=()=>{
  setReplyState(true)
}

  // use effect

  useEffect(() => {
    const url = window.location.pathname
   
    setUname( url.split("/")[2])
    let swiper:Swiper
   if(viewer.display){
    swiper = new Swiper('.swiper',{
      modules:[Navigation,Pagination],
    direction:"horizontal",
    loop:false,
    initialSlide:initialSlide,
    slidesPerView:1,parallax:true
   ,pagination:{
    el:'.swiper-pagination',
   },
   navigation:{
    nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev'
   },
   spaceBetween:10
   })

}

return ()=>{
  if(swiper){
    swiper.destroy()
  }
}
   }, [viewer,initialSlide])






  return (
    // style={{filter:viewer.display == true?"brightness(0.4) blur(10px)":"brightness(1) blur(0px)" }}
    <>
    {reply?<ReplyDenonymsScreen setState={setReplyState} ids={selectedResponses} />:null}
    <FloatButtonComponent  replySS={replySS} className={`${selectedResponses.length ==0?"bottom-[-10%] opacity-0 transition-[bottom] duration-[0.4s]":"bottom-[10%] opacity-[1] transition-[bottom] duration-[0.4s]"}`} />
{viewer.display?<XIcon className={"fixed  text-[#ffdf00] bg-black p-[2px] cursor-pointer  rounded-full right-[2%] top-[10%] z-[8] " } size={40} onClick={
  ()=>{
    setViewerState((prev)=>{
      return{img:[],display:false}
    })
  }
} />:<></>
}    
<div id="image_viewer"  className={viewer.display ? "fixed h-[100vh]   w-full left-0 top-0 z-[7] bg-black overflow-y-scroll " : ""}>
<div className="swiper relative h-[100%] ">
<div className="swiper-wrapper absolute">
  {viewer.img.map((e, index) => (

    <div key={index} className="image-container swiper-slide">
      <DownloadIcon size={35} className="absolute top-[10%] left-[5%] text-[#ffdf00] z-[7] cursor-pointer" onClick={
        ()=>{
          downloadMedia(e.link)
        }
      } />
   { e.mimeType.split("/")[0].toLowerCase() == "image"?  <Image

        src={e.link}
        alt=""
        style={{ transition: "all 2s linear" }}
        width={2048}
        height={2048}
        className="centered-image "
      />:
      <video
                      
      controls
      width={2048}
      className="  centered-video "
      height={2048}

    >
      <source src={e.link} type={e.mimeType} />
    </video>
      }
    </div>
  ))}
  
  </div>
  <div className="swiper-button-prev"></div>
  <div className="swiper-button-next"></div>
  <div className="swiper-pagination"></div>
  </div>
    
</div>

    <section id="reply_container_ul" className={" "+viewer.display?"overflow-hidden bg-[#1e1e1e] py-12":"bg-[#1e1e1e] py-12"} >

 <h3 className="text-center text-xl font-extrabold gradient_elements_text">
        All Responses({replys.length})
      </h3>
      <ul  className={viewer.display?"overflow-y-hidden":""}>
   
        {replys.map((e, n) => 
        {
          let l = e.media.filter(f=>f.mimeType.split("/")[0].toLowerCase() == "video" || f.mimeType.split("/")[0].toLowerCase() == "image")
          let a =e.media.filter(f=>f.mimeType.split("/")[0].toLowerCase() == "audio" ) 
          return(
            <div key={n}>
          <li
            id={`reply_${n}`}
            onClick={
              (e)=>{
                if(!session || !user || user.username != uname){
                  return
                } 
                const id = `${(e.currentTarget.id)}`
                let index=selectedResponses.findIndex((n)=>n==id);
                if(index < 0){
                if(selectedResponses.length >= 3)return

                  setSelectedResponses(prev=>[...prev,id])
                  e.currentTarget.style.backgroundColor="#555"

                }else{
                  setSelectedResponses(prev=>prev.filter(a=>a!=id))
                  e.currentTarget.style.backgroundColor="#000"

                }
              }
            }
            className={`mt-10 mb-4 py-16 px-4 w-[95%] shadow-hd rounded-[10px] mx-auto bg-[#000] ${user?"cursor-pointer":"cursor-default"}`}
          >
            
            <div className={
             ` md:w-full md:mx-auto ${l.length >= 4?"gridMediaDisplay4":l.length==3?"gridMediaDisplay3":l.length == 2?"gridMediaDisplay2":"gridMediaDisplay1"}`}>
               
              {l.map((mediaItem, index) => {
                let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
                  
                  if(index == 3 && e.media.length >4){

                    return(
                      <div
                      id={`media_${index}`}
                      className={`w-full media_${index}bg-[#111]  rounded-[3px] flex items-center justify-center relative`}
                      key={index}
                      onClick={(e)=>{
                        e.stopPropagation()

                         if(!viewer.display){ 
                          setInitialSlide(3)
                          setViewerState({display:true,img:l})
                        }
                      }}
                    >
                      {mimeType =="image"?<Image
                          src={mediaItem.link}
                          width={240}
                          height={240}
                          
                          alt=""
                          className="min-h-[100px]  h-full  "
                         
                        />:mimeType == "video"?<PlayCircle className="rounded-[3px] h-full opacity-[0.4] " />:null}
                       <p className="absolute text-center text-2xl mx-auto left-0 right-0 top-[40%] z-2 ">
                      +{e.media.length - 4}
                    </p>
                    </div>
                    )
                  }
                  if(index > 3){
                    return <Fragment key={index}></Fragment>
                  }
                  if (index <= 3 ) {
                    return (
                      <div
                        id={`media_${index}`}
                        className={`w-fit media_${index} bg-[#111]  rounded-[3px] flex items-center justify-center hover:scale-[1.02] transition-transform duration-[0.3s] `}
                        key={index}
                        onClick={(e)=>{
                          e.stopPropagation()
                           if(!viewer.display){ 
                            setInitialSlide(index)
                            setViewerState({display:true,img:l})
                          }
                        }}
                      >
                        {mimeType =="image"?<Image
                          src={mediaItem.link}
                          width={400}
                          height={400}
                          
                          alt=""
                          className="block rounded-[3px]  "
                         
                        />:mimeType == "video"?<PlayCircle size={40} className={` rounded-[3px] h-full  `} />:null}
                        
                      </div>
                    );
                  }
                  
                
               
              
            
              })}
            </div>
        
            <div className={style.replyVideoMedia}>
              {a.map((mediaItem, index) => {

                let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
                if (mimeType == "audio") {
            
                  return (
                    <div className="audio-player my-4" key={index} onClick={(e)=>{e.stopPropagation()}}>
                   <WaveformComponent index={index} audioSrc={mediaItem.link}/>

                    </div>
                  );
                }else{
                  return null
                }
              })}
            </div>
            <p id="text-response" className="bg-[#222]  p-4 rounded-md my-2">{e.text}</p>
            <ModalComponent
              setState={setShareState}
              state={shareState}
              title="share response"
            >
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  copyReplyLinkToClipBoard(
                    window.location.origin +
                      window.location.pathname +
                      `#${index}`
                  );
                  setShareState(false);
                }}
              >
                <CiLink size={30} />
              </div>
            </ModalComponent>
            <Share2Icon
              className="cursor-pointer"
              onClick={() => {
                setIndex(n);
                setShareState(true);
              }}
            />
          </li>
{user?          <small  className=" italic text-white/70 text-center block">click on response to select </small>:<></>
}          </div>
        )}
        
        
        )}
      </ul>
    </section>
    </>
  );
}

export const CreateDenonymousClient = () => {


  const [isOpen, setIsOpen] = useState(false);

 
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        onClick={handleModalOpen}
        style={{ cursor: "pointer" }}
        className="flex items-center justify-center flex-col"
      >
        <svg
          width="76"
          height="68"
          viewBox="0 0 76 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69.0909 35.1594C65.4005 33.8728 61.4153 33.6413 57.5967 34.4915C53.7782 35.3418 50.2823 37.2391 47.514 39.9637C44.7456 42.6884 42.8178 46.129 41.954 49.8873C41.0901 53.6456 41.3253 57.5679 42.6325 61.2H3.45455C2.53834 61.2 1.65967 60.8418 1.01181 60.2042C0.36396 59.5665 0 58.7017 0 57.8V3.4C0 2.49826 0.36396 1.63346 1.01181 0.995837C1.65967 0.358213 2.53834 0 3.45455 0H65.6364C66.5526 0 67.4313 0.358213 68.0791 0.995837C68.727 1.63346 69.0909 2.49826 69.0909 3.4V35.1594ZM34.7527 29.5222L12.6022 11.0092L8.12855 16.1908L34.7976 38.4778L60.9865 16.1738L56.468 11.0296L34.7527 29.5222ZM65.6364 51H76V57.8H65.6364V68H58.7273V57.8H48.3636V51H58.7273V40.8H65.6364V51Z"
            fill="url(#paint0_linear_169_1289)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_169_1289"
              x1="76"
              y1="34.0725"
              x2="-4.16699e-07"
              y2="34.0725"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFDF00" />
              <stop offset="0.276042" stop-color="#F6D108" />
              <stop offset="0.541667" stop-color="#EDC211" />
              <stop offset="0.776042" stop-color="#E3B419" />
              <stop offset="1" stop-color="#DAA521" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 className={styles.gradientHeader + " mt-7 text-xl text-center"}>
        Create a Denonymous
      </h1>
      {isOpen && (
        <>
          <section className={`${styles.modal} h-full w-full`}>
            <div
              className={`${styles.modalContent} relative bg-[#242222] p-5 w-5/6 sm:w-[500px] h-[500px] mx-auto my-auto`}
            >
              <h1
                className={
                  "text-center font-bold text-xl pb-3 " + styles.gradientHeader
                }
              >
                Create a Denonymous
              </h1> 
              <CreateDenonymousForm handleModalClose={handleModalClose} />
              <button
                className="absolute top-0 right-0 p-4 text-[#fff] text-2xl"
                onClick={handleModalClose}
              >
                &times;
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};