"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { connectMongoClient, disConnectMongoClient } from "../DB/conection"
import { cookies } from "next/headers"
import { createDenonymous, deleteDenonymousDB, denonymousViewStateChange, sendRelpy } from "../DB/queries/auth/query"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const createDenonyous = async(e:FormData)=>{
let cookie = cookies().get("denon_session_0")
if(!cookie || !cookie.value) return null
const sessionToken = verifyUserDataToken(cookie.value)
if(!sessionToken) return
const topic = e.get("topic") as string | undefined
const desc = e.get("description") as string | undefined
if(!topic) throw new Error("denonymous topic cannot be empty")
await connectMongoClient()
await createDenonymous(sessionToken.email,topic,sessionToken.uuid,desc)
await disConnectMongoClient()

revalidatePath("/")
revalidateTag("raieneidmie_00")
}

export const sendRelpyAction = async(username:string,topic:string,reply:any)=>{
    // throw new Error('Failed to Delete Invoice');

try{    
    await connectMongoClient()
    await sendRelpy(username,topic,reply);
    await disConnectMongoClient()
    revalidateTag("denonymous_box_0102")
    revalidateTag("raieneidmie_00")
}catch(err:any){
        console.log(err)
        return "an error occured"
    }
}


export const changeDenonymousViewState=async(topic:string)=>{
    let cookie = cookies().get("denon_session_0")
    console.log(cookie)
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
    try{    
console.log(topic,"topic")
    
        await connectMongoClient()
        await denonymousViewStateChange(sessionToken.uuid,topic)
        await disConnectMongoClient()
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")
    }catch(err:any){
            console.log(err)
            throw new Error("something went wrong!")
        }
}

export const deleteDenonymousAction=async(topic:string)=>{
    let cookie = cookies().get("denon_session_0")
    console.log(cookie)
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
    try{    
    
        await connectMongoClient()
      let r=   await deleteDenonymousDB(sessionToken.uuid,topic)
        
        await disConnectMongoClient()
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")

        return r
    }catch(err:any){
            console.log(err)
            throw new Error("something went wrong!")
        }
}