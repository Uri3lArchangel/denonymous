"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { cookies } from "next/headers"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { createDenonymous, deleteDenonymousDB, denonymousViewStateChange, sendRelpy } from "../DB/queries/denonymous/query"


export const createDenonyous = async(prev:any,e:FormData)=>{

try{
let cookie = cookies().get("denon_session_0")
if(!cookie || !cookie.value){
  redirect("/auth/signin")
}
const sessionToken = verifyUserDataToken(cookie.value)
if(!sessionToken){
  redirect("/auth/signin")
}
console.log(1)
const topic = e.get("topic") as string | undefined
const desc = e.get("description") as string | undefined

if(!topic) return {message:"Topic cannot be empty",type:"warning",reason:"topic"}
if(topic.length > 50)return {message:"Invalid topic length",type:"warning",reason:"topic"}
if(desc && desc.length > 100) return {message:"Invalid decription length",type:"warning",reason:"description"}
await createDenonymous(sessionToken.email,topic,sessionToken.uuid,desc)
revalidatePath("/")
revalidateTag("denonymous_box_0102")
revalidateTag("raieneidmie_00")
return {message:"Denonymous created",type:"success"}
}

catch(err:any){
  return {message:err.message,type:"error"}
}


}

export const sendRelpyAction = async(username:string,topic:string,reply:any)=>{

try{    

    await sendRelpy(username,topic,reply);
    revalidateTag("denonymous_box_0102")
    revalidateTag("raieneidmie_00")
}catch(err:any){
        console.log(err)
        return "an error occured"
    }
}


export const changeDenonymousViewState=async(topic:string)=>{

    let cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
    try{    
        
        await denonymousViewStateChange(sessionToken.uuid,topic)
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")
    }catch(err:any){
            throw new Error("something went wrong!")
        }
}

export const deleteDenonymousAction=async(topic:string)=>{

    let cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
    try{    
    
      let r=   await deleteDenonymousDB(sessionToken.uuid,topic)
    const urls=[]
                if(!r) return
                for(let i=0;i<r.length;i++){
                  for(let j=0;j<r[i].media.length;j++){
                urls.push(r[i].media[j].link)
                  }
                }
              revalidateTag("notifications_fetch_tag")
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")
        return urls
    }catch(err:any){
            console.log(err)
            throw new Error("something went wrong!")
        }
}

