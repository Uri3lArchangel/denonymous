
'use client'
// import FooterSub from "@/src/FE/components/subcomponents/FooterSub";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

let FooterSub:any;


function Footer() {
  const [state,setState]=useState(false)
  useEffect(()=>{
    const trigger = document.getElementById("trigger") as HTMLDivElement
    if((trigger.getBoundingClientRect().top) <= (window.innerHeight+300)){
   FooterSub = dynamic(()=>import("@/src/FE/components/subcomponents/FooterSub"))
   setState(true)
    }
    window.onscroll=()=>{
    const trigger = document.getElementById("trigger") as HTMLDivElement
    if((trigger.getBoundingClientRect().top) <= (window.innerHeight+300)){
   FooterSub = dynamic(()=>import("@/src/FE/components/subcomponents/FooterSub"))
   setState(true)
    }
  }
  
  },[])
  
  return (
    <>
  <div id="trigger"></div>
 {state?<FooterSub />:<></>}
 </>
  
  )
}

export default Footer