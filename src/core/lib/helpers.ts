import { userModelType } from "@/types"
import React from "react"

export const URLRESOLVE =(a:string)=>{
if(process.env.NODE_ENV =="production"){
    return window.location.origin+a
}else{
    return a
}
}
export const filterDenonymous=(all:userModelType,topic:string)=>{
    console.log({all,topic})
    if(!all) throw new Error("This denonymous does not exist or has been deleted|client")

    if(!all.denonymous) return {}
    const Denonymous = all.denonymous.filter((e)=>(e.responsesViewState && e.topic==topic && !e.isDeleted)) 
    if(Denonymous.length == 0) return {}
    return Denonymous[0]
}

export const filterReplys=(all:userModelType,topic:string)=>{
    if(!all) throw Error("Invalid parameters")
    if(!all.denonymous) return {}
    const Denonymous = all.denonymous.filter((e)=>(e.responsesViewState && e.topic==topic && !e.isDeleted)) 
    if(Denonymous.length == 0) return {}
    return Denonymous[0].replys
}
export const filterMediaLimitOn = (all:userModelType,topic:string)=>{
    if(!all) throw Error("Invalid parameters")

    if(!all.denonymous) return false
    const Denonymous = all.denonymous.filter((e)=>(e.responsesViewState && e.topic==topic && !e.isDeleted)) 
    if(Denonymous.length == 0) return false;
    const status = Denonymous[0].isAudioLimitOn && Denonymous[0].isVideoLimitOn && Denonymous[0].isImageLimitOn
    return status
}

// export const screenshot=async()=>{}

export const downloadFile = async(a:string,type:"image"|"video"|"audio",ext:string,e:React.MouseEvent<HTMLDivElement>)=>{
  
    let link =document.createElement("a") as HTMLAnchorElement;
        link.href=a;
        link.download = `${type}_${(Math.random()*1000).toFixed(0)}.${ext}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
}