"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { connectMongoClient, disConnectMongoClient } from "../DB/conection"
import { cookies } from "next/headers"
import { createDenonymous, sendRelpy } from "../DB/queries/auth/query"
import { revalidatePath, revalidateTag } from "next/cache"

export const createDenonyous = async(e:FormData)=>{
let cookie = cookies().get("denon_session_0")
if(!cookie || !cookie.value) return null
const sessionToken = verifyUserDataToken(cookie.value)
if(!sessionToken) return
const topic = e.get("topic") as string | undefined
if(!topic) throw new Error("denonymous topic cannot be empty")
await connectMongoClient()
console.log(sessionToken.email)
await createDenonymous(sessionToken.email,topic,sessionToken.uuid)
await disConnectMongoClient()

revalidatePath("/")
}

export const sendRelpyAction = async(uuid:string,topic:string,reply:any)=>{
    // throw new Error('Failed to Delete Invoice');

try{    await connectMongoClient()
    await sendRelpy(uuid,topic,reply);
    await disConnectMongoClient()
    revalidateTag("raieneidmie_00")
}catch(err:any){
        console.log(err)
        return "an error occured"
    }
}