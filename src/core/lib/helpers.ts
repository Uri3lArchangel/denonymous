import { userModelType } from "@/types"

export const URLRESOLVE =(a:string)=>{
if(process.env.NODE_ENV =="production"){
    return window.location.origin+a
}else{
    return a
}
}
export const filterDenonymous=(all:userModelType,topic:string)=>{
    if(!all) throw Error("Invalid parameters")
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