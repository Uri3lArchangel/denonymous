'use client'
import { CrossIcon, DownloadIcon, PlusIcon, Trash2, XIcon } from 'lucide-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import * as htmlImages from "html-to-image";
import Image from 'next/image';
import logo from '@/public/images/logo.avif'
import Loading from '@/app/loading';

function ReplyDenonymsScreen({ids,setState,box}:{box:string,ids:string[],setState:React.Dispatch<SetStateAction<boolean>>}) {
  const [texts,setTexts]=useState<string[]>([])
  const [uname,setUname]=useState("")

  // const [isReply,setReply]=useState(false)
  const [pending,setPending]=useState(false)
  const addReplyVisible = (e:React.MouseEvent<HTMLDivElement>)=>{
    const id = e.currentTarget.id
    const targetId = id.replace("icon","replydiv");
    const buttons = id.replace("icon","divbuttons");
    const display = id.replace("icon","data");
    const inputId = id.replace("icon","reply");


    (document.getElementById(targetId) as HTMLDivElement).style.display ="flex";
    (document.getElementById(inputId) as HTMLTextAreaElement).style.display ="block";
    (document.getElementById(buttons) as HTMLDivElement).style.display ="flex";
    (document.getElementById(display) as HTMLDivElement).className = "bg-[#111010] min-h-[20px] p-2 py-4 flex-col relative my-2 rounded-md text-[#6e6e6e]";

   
    e.currentTarget.style.display="none"
    
    
  }

  const cancelReplyVisible = (e:React.MouseEvent<HTMLButtonElement>)=>{
    const id = e.currentTarget.id
    const inputId = id.replace("button","replydiv");
    const iconId = id.replace("button","icon");
    const display = id.replace("button","data");
    const holder = id.replace("button","holder");
    
    (document.getElementById(inputId) as HTMLDivElement).style.display ="none";
    (document.getElementById(holder) as HTMLParagraphElement).style.display ="none";
    (document.getElementById(iconId) as HTMLDivElement).style.display ="flex";
    (document.getElementById(display) as HTMLDivElement).className = "text-3xl";


  }

  const saveReply=(e:React.MouseEvent<HTMLButtonElement>)=>{
    const id = e.currentTarget.id
    const inputId = id.replace("savebutton","reply");
    const inputdivId = id.replace("savebutton","replydiv");
    const buttonsDivId = id.replace("savebutton","divbuttons")
    const deleteDivId = id.replace("savebutton","delete")
    const iconid = id.replace("savebutton","icon")
    const display = id.replace("savebutton","data")
    const holder = id.replace("savebutton","holder")


    const input = document.getElementById(inputId) as HTMLTextAreaElement;
    const div = document.getElementById(buttonsDivId) as HTMLDivElement
    const deletediv = document.getElementById(deleteDivId) as HTMLDivElement
    const inputdiv =  document.getElementById(inputdivId) as HTMLDivElement
    const icondiv =  document.getElementById(iconid) as HTMLDivElement
    const displaydiv =  document.getElementById(display) as HTMLDivElement
    const holderdiv =  document.getElementById(holder) as HTMLParagraphElement



    
    if(input.value == ""){
    displaydiv.className = "text-3xl";
    deletediv.style.display="none"
    inputdiv.style.display="none"
    icondiv.style.display="flex"
    div.style.display="none"
    return
    }
    // input.readOnly=true
    holderdiv.innerText = input.value
    holderdiv.style.display = "block"


    input.style.display="none";
    div.style.display="none"
    deletediv.style.display="flex"
    displaydiv.className = "bg-[#111010] min-h-[20px] p-2 py-4 flex-col relative my-2 rounded-md text-[#6e6e6e]";


  }

  const deleteReply=(e:React.MouseEvent<HTMLDivElement>)=>{
    const id = e.currentTarget.id
    
    const inputdivId = id.replace("delete","replydiv");
    const iconId = id.replace("delete","icon");
    const inputId = id.replace("delete","reply");
    const display = id.replace("delete","data");
    const holder  = id.replace("delete","holder");

    (document.getElementById(inputId) as HTMLTextAreaElement).value="";
    (document.getElementById(inputdivId) as HTMLDivElement).style.display ="none";
    (document.getElementById(holder) as HTMLParagraphElement).style.display ="none";
    (document.getElementById(holder) as HTMLParagraphElement).innerText ="";
    (document.getElementById(id) as HTMLDivElement).style.display ="none";
    (document.getElementById(iconId) as HTMLDivElement).style.display ="flex";
    (document.getElementById(display) as HTMLDivElement).className = "text-3xl";


  }


  const downloadSS = async () => {
    setPending(true)
    const download = document.getElementById("donwloadicon") as HTMLDivElement;
    const x = document.getElementById("xicon") as HTMLDivElement;
    let sub = document.getElementById("subcontainer") as HTMLDivElement;
    let node = document.getElementById("replycontainer") as HTMLDivElement;
    node.style.alignItems="flex-start"
    download.style.display ="none"
    x.style.display ="none"
    // sub.style.width="700px"
    sub.style.overflow="hidden";
    sub.classList.add("replyBG")
    sub.style.backgroundSize="160% 100%"





    let data = await htmlImages.toJpeg(sub,{quality:4028,type:"avif",width:700,height:1024});
    const link = document.createElement("a") 
    link.href=data
    link.download="image"
    link.click()
    sub.style.width="100%"
    download.style.display ="block"
    sub.classList.remove("replyBG")
    node.style.alignItems="flex-center"
    x.style.display ="block"
 

    setPending(false)
  };

  useEffect(()=>{
    for(let i =0;i<ids.length;i++){
        let a = document.querySelector(`#${ids[i]} #text-response`) as HTMLParagraphElement
        setTexts(
            prev=>[...prev,a.innerText]
            )
    }
    const url = window.location.pathname
   
    setUname( url.split("/")[2])
    return()=>{
        setTexts([])
    }
   
  },[])
  return (
    <>
    {pending?<Loading />:null}
    <div id='replycontainer' className=' fixed py-8 top-0 flex flex-col items-center z-[100] left-0 w-[100%] bg-black h-full replyBG   ' >
      <DownloadIcon id="donwloadicon" className="fixed text-[#f2d204] brightness-[1.2] left-10 top-10 cursor-pointer z-[5]" size={30} onClick={downloadSS} />
        <XIcon id="xicon" className="fixed text-[#f2d204] brightness-[1.2] right-10 top-10 cursor-pointer z-[5]" size={30} onClick={()=>{
            setState(false)
        }} />
        <div className='  flex flex-col items-center  min-h-[100vh] overflow-y-scroll w-full py-10 'id="subcontainer">
      <h1 className='text-3xl font-bold w-full text-center mb-10 text-white ' id='title'>{ decodeURIComponent(box) }</h1>
      <div className='absolute bottom-10 left-10 flex items-center text-lg ' id='attribution'>@{uname} on <Image className='w-20 ml-1' src={logo} alt='denonymous'/></div>

        {texts.map((e,i)=>(
            <div key={i} className='max-w-[500px] w-full  px-4 h-fit py-4 shadow-gold-2 bg-neutral-800 rounded-[10px] shadow border border-[#e4c92f] my-4'>
            <div className='flex justify-between'> <span className='gradient_elements_text text-lg'>~{uname}</span><div className='flex justify-end cursor-pointer' id={`delete_input_${i}`} style={{display:"none"}} onClick={deleteReply}><Trash2 size={20} className="text-[#f6d108]" /></div></div> 
          <div onClick={addReplyVisible} id={`icon_input_${i}`} className='flex items-center cursor-pointer my-2 text-md'><PlusIcon className="text-[#f6d108] " size={30}/><span className='gradient_elements_text'>Add a reply</span> </div>
                <div className={`text-xl text-white break-words`} id={`data_input_${i}`}>{e}</div>
                <div style={{display:"none",flexDirection:"column"}} id={`replydiv_input_${i}`}> <textarea  name="" maxLength={100} id={`reply_input_${i}`} className='w-full text-xl h-fit min-h-[60px] outline-none text-white bg-transparent overflow-hidden'  placeholder='Type your reply here' cols={3} ></textarea>
                <p id={`holder_input_${i}`}></p>
               <div id={`divbuttons_input_${i}`} className='h-fit text-black ' style={{alignSelf:"flex-end"}}><button className='gradient_elements_div px-4 py-1 mr-2 rounded-md' onClick={saveReply} id={`savebutton_input_${i}`}>Save</button><button className="border border-red-500 text-red-500 px-4 py-1 ml-2 rounded-md" id={`button_input_${i}`} onClick={cancelReplyVisible}>Cancel</button></div></div>
            </div>
            ))
        
        }</div>
    </div>
    </>
  )
}

export default ReplyDenonymsScreen