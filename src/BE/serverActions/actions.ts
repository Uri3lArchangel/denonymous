"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { cookies } from "next/headers"
import { createDenonymous, deleteDenonymousDB, denonymousViewStateChange, findUserByEmail, sendRelpy } from "../DB/queries/auth/query"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"


export const createDenonyous = async(prev:any,e:FormData)=>{
  revalidatePath("/")
  revalidateTag("raieneidmie_00")
try{
let cookie = cookies().get("denon_session_0")
if(!cookie || !cookie.value){
  redirect("/auth/signin")
}
const sessionToken = verifyUserDataToken(cookie.value)
if(!sessionToken){
  redirect("/auth/signin")
}
const topic = e.get("topic") as string | undefined
const desc = e.get("description") as string | undefined

if(!topic) throw new Error("denonymous topic cannot be empty|client")
if(topic.length > 50) throw new Error("topic too long max is 50 characters|client")
if(desc && desc.length > 100) throw new Error("description too long max is 100 characters|client")
await createDenonymous(sessionToken.email,topic,sessionToken.uuid,desc)
return {message:"denonymous created"}
}

catch(err:any){
 throw new Error(err.message)
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
              
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")
        return urls
    }catch(err:any){
            console.log(err)
            throw new Error("something went wrong!")
        }
}

