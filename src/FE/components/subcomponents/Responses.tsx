"use client";
import { replyModelType } from "@/types";
import Image from "next/image";
import { useSession } from "../hooks/SessionHook";
import dynamic from "next/dynamic";
import React, {  Fragment,  useEffect, useState } from "react";
import { DownloadIcon, PlayCircle, Share2Icon, XIcon } from "lucide-react";
import {FloatButtonComponent, ModalComponent} from "@/src/FE/components/libraries/antd";
import { CiLink } from "react-icons/ci";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
let ReplyDenonymsScreen:any;
let WaveformComponent :any
import { downloadMedia } from "@/src/core/lib/helpers";
import styles from "@/public/styles/styles.module.css";
import { TiCancel } from "react-icons/ti";


export default function Responses({ box,replys,owner }: { box?:string,replys: replyModelType[],owner:string }) {
    const {user,session,fetchUser} = useSession()
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
      // const [pending,setPending]=useState(false)
      // const [visiblitySection,setVisiblitySelection]=useState({set:true,visibility:""})
    
      // internal functions
      const copyReplyLinkToClipBoard = (a: string) => {
        navigator.clipboard.writeText(a);
      };
    
    const replySS=()=>{
      ReplyDenonymsScreen = dynamic(()=>import("@/src/FE/components/subcomponents/ReplyDenonymsScreen"))
      setReplyState(true)
    }
    
      // use effect
    
      useEffect(() => {
        const url = window.location.pathname
        setUname( url.split("/")[2])
        let swiper:Swiper
        fetchUser()

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
       }, [initialSlide,viewer])
    
    
    
    
      
      
    
      return (
        // style={{filter:viewer.display == true?"brightness(0.4) blur(10px)":"brightness(1) blur(0px)" }}
        <>
        {reply?<ReplyDenonymsScreen box={box} setState={setReplyState} ids={selectedResponses} />:null}
        <FloatButtonComponent  replySS={replySS} selected={selectedResponses.length}  className={`${selectedResponses.length ==0?"bottom-[-10%] opacity-0 transition-[bottom] duration-[0.4s]":"bottom-[10%] opacity-[1] transition-[bottom] duration-[0.4s]"}`} />
    {viewer.display?<XIcon className={"fixed  text-[#ffdf00] bg-black p-[2px] cursor-pointer  rounded-full right-[2%] top-[10%] z-[8] " } size={40} onClick={
      ()=>{
        setViewerState((prev)=>{
          return{img:[],display:false}
        })
      }
    } />:<></>
    }    
    <div id="image_viewer"  className={viewer.display ? "fixed h-[100vh]   w-full left-0 top-0 z-[7] bg-black overflow-y-hidden " : ""}>
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
            fetchPriority="low"
            loading="lazy"
            src={e.link}
            alt=""
            style={{ transition: "all 2s linear" }}
            width={2048}
            height={2048}
            className="centered-image "
          />:
          <video  
          draggable={false}
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
              if(!e.visible && user?.email != owner){
                return(
                    <li key={n} className={`flex text-gray-400 items-center mt-10 mb-4 py-16 px-4 w-[95%] shadow-hd rounded-[10px] mx-auto bg-[#000] cursor-default`}
                    ><TiCancel size={45}  />
                    This response was hidden by @{uname}</li>
                )
             }else{
              return(
          <li key={n}>
              <div
                id={`reply_${n}`}
                onClick={
                  (b)=>{
                    if(!session || !user || user.username != uname){
                      return
                    } 
                    const id = `${(b.currentTarget.id)}`
                    let index=selectedResponses.findIndex((n)=>n==id);
                    if(selectedResponses.length >3 )return
                    if(index < 0){
            
                      setSelectedResponses(prev=>[...prev,id])
                    b.currentTarget.style.backgroundColor="#555"
                 
                    }else{
                 
                      setSelectedResponses(prev=>prev.filter(a=>a!=id))
                      b.currentTarget.style.backgroundColor="#000"
    
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
                              fetchPriority="low"
                              alt=""
                              className="min-h-[100px] cursor-pointer h-full  "
                             
                            />:mimeType == "video"?<PlayCircle className="rounded-[3px] h-full opacity-[0.4] cursor-pointer "  />:null}
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
                            className={`w-fit media_${index} bg-[#111]  rounded-[3px] flex items-center justify-center transition-transform duration-[0.3s] `}
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
                              fetchPriority="low"
                              alt=""
                              className="block rounded-[3px] cursor-pointer "
                             
                            />:mimeType == "video"?<PlayCircle size={40} className={` rounded-[3px] h-full  cursor-pointer `} />:null}
                            
                          </div>
                        );
                      }
                      
                    
                   
                  
                
                  })}
                </div>
            
                <div className={styles.replyVideoMedia}>
                  {a.map((mediaItem, index) => {
                    WaveformComponent = dynamic(()=>import("@/src/FE/components/libraries/Wavesurfer"))
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
                <p id="text-response" className="  p-4 rounded-md my-2">{e.text}</p>
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
              </div>:
    {user?<small  className=" italic text-white/70 text-center block">click on response to select </small>:<></>}          
    </li>
            )
            }
          
          }
            
            
            )}
          </ul>
        </section>
        </>
      );
    }