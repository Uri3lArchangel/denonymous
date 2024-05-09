"use client";
import { replyModelType } from "@/types";
import Image from "next/image";
import { useSession } from "../hooks/SessionHook";
import dynamic from "next/dynamic";
import React, {  Fragment,  useContext,  useEffect, useState } from "react";
import { DownloadIcon, Link2Icon, PlayCircle, Share2Icon, XIcon } from "lucide-react";
import {FloatButtonComponent} from "@/src/FE/components/libraries/antd";
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
import LoadingSkeleton from "../assets/LoadingSkeleton";
import { NotificationContext } from "../contexts/NotificationContext";
import Loading from "@/app/loading";


export default function Responses({ box,responses,owner }: { box?:string,responses: replyModelType[],owner:string }) {
    const {user,session,fetchUser} = useSession()
    const [pageLoading,setPageLoading]=useState(true)
    const notification = useContext(NotificationContext)!
    // All states
      const [viewer,setViewerState]= useState<{img: {
        link: string;
        mimeType: string;
    }[],display:boolean}>({img:[],display:false})
      const [index, setIndex] = useState(0);
      const [initialSlide,setInitialSlide]=useState(0)
      const [selectedResponses,setSelectedResponses]=useState<string[]>([])
      const [reply,setReplyState]=useState(false)
      const [uname,setUname]=useState("")
      const [initialLoadCount, setInitialLoadCount] = useState(5); // Number of responses to load initially
      const subsequentLoadCount=5; // Number of responses to load subsequently
      const [loading, setLoading] = useState(false); // State to track loading state
      const [scrolledToBottom, setScrolledToBottom] = useState(false); // State to track if user scrolled to bottom
      const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 200;
        setScrolledToBottom(scrolledToBottom);
    };
    useEffect(() => {
      setPageLoading(false)
      window.addEventListener('scroll', handleScroll); // Listen for scroll events
      return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);
  useEffect(() => {
    if (scrolledToBottom && responses.length > initialLoadCount && !loading) {
        // Load more responses when scrolled to bottom
        setLoading(true); // Set loading state to true
        // Simulate loading delay (replace with actual API call)
        setTimeout(() => {
            setInitialLoadCount(initialLoadCount + subsequentLoadCount); // Increase initial load count
            setLoading(false); // Set loading state to false
        }, 1000); // Adjust loading time as needed
    }
}, [scrolledToBottom, responses, initialLoadCount, loading]);
    
      // internal functions
      const copyReplyLinkToClipBoard = (c:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      c.stopPropagation()
const id= c.currentTarget.id
        navigator.clipboard.writeText(`${window.location.href+'#'+id}`);
        notification({type:"success",message:"link copied",description:""})
        
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
       }, [initialSlide,viewer,index])
    
    
    
    
      
      
    
      return (
        // style={{filter:viewer.display == true?"brightness(0.4) blur(10px)":"brightness(1) blur(0px)" }}
        <>
        {pageLoading?<Loading />:<></>}
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
    
        <section id="reply_container_ul" className={viewer.display?"overflow-hidden rounded-md max-w-[500px] bg-[#1e1e1e] py-12":"bg-[#1e1e1e] py-12"} >
    
     <h3 className="text-center text-xl font-extrabold gradient_elements_text">
            All Responses({responses.length})
          </h3>
          <ul  className={viewer.display?"overflow-y-hidden":""}>
       
          {responses.slice(0, initialLoadCount).map((e:replyModelType, n) => {

           
              let l = e.media.filter(f=>f.mimeType.split("/")[0].toLowerCase() == "video" || f.mimeType.split("/")[0].toLowerCase() == "image")
              let a =e.media.filter(f=>f.mimeType.split("/")[0].toLowerCase() == "audio" ) 
              if(!e.visible && user?.email != owner){
                return(
                    <li key={n} id={`${index}`} className={`flex text-gray-400 items-center mt-10 mb-4 py-8 px-4 w-[95%] shadow-hd rounded-[10px] mx-auto bg-[#000] cursor-default`}
                    ><TiCancel size={45}  />
                    This response was hidden by @{uname}</li>
                )
             }else{
              return(
          <li key={n} id={`${index}`}>
              <div
                id={`reply_${n}`}
                onClick={
                  (b)=>{
                    if(!session || !user || user.username != uname){
                      return
                    } 
                    const id = `${(b.currentTarget.id)}`
                    let index=selectedResponses.findIndex((n)=>n==id);
                    if(index < 0){
                      if(selectedResponses.length >=3 )return
                      setSelectedResponses(prev=>[...prev,id])
                    b.currentTarget.style.backgroundColor="#555"
                 
                    }else{
                 
                      setSelectedResponses(prev=>prev.filter(a=>a!=id))
                      b.currentTarget.style.backgroundColor="#000"
    
                    }
                  }
                }
                className={`mt-10 bg-[#000] mb-4 py-4 px-4 w-[95%] shadow-hd  mx-auto rounded-[10px] ${user?"cursor-pointer":"cursor-default"}`}
              >
                
                <div className={
                 ` md:w-full md:mx-auto ${l.length >= 4?"gridMediaDisplay4":l.length==3?"gridMediaDisplay3":l.length == 2?"gridMediaDisplay2":"gridMediaDisplay1"}`}>
                   
                  {l.map((mediaItem, index) => {
                    let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
                      
                      if(index == 3 && e.media.length > 4){
    
                        return(
                          <div
                          id={`media_${index}`}
                          className={`w-full media_${index}bg-[#111] opacity-[0.9] rounded-[3px] flex items-center justify-center relative`}
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
                             
                            />:mimeType == "video"?<video><source src={mediaItem.link} /></video>:null}
                           <p className="absolute text-center text-white text-2xl mx-auto left-0 right-0 top-[40%] z-2 cursor-pointer">
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
                             
                            />:mimeType == "video"?<video><source src={mediaItem.link} /></video>:null}
                            
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
                <p id="text-response" className=" text-white p-4 rounded-md my-2 break-words ">{e.text}</p>
              
                <Link2Icon
                id={`${n}`}
                  className="cursor-pointer gradient_elements_div rounded-full w-[35px] h-[35px] text-black p-[0.3em] mx-auto"
                  onClick={(c) => {
                   copyReplyLinkToClipBoard(c)

                  }}
                />
              </div>
    {user && user.email == owner?<small  className=" italic text-white/70 text-center block"> ⌃⌃ click on response to select ⌃⌃</small>:<></>}          
    </li>
            )
            }
          
          }
            
            
            )}
          </ul>
          {loading && (
[1,2,3,4,5].map((e)=>(
  <LoadingSkeleton key={e} className="w-[95%] h-[130px] opacity-[0.7] my-10 mx-auto" />
))

)}
        </section>
        </>
      );
    }