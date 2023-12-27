"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { connectMongoClient, disConnectMongoClient } from "../DB/conection"
import { cookies } from "next/headers"
import { createDenonymous } from "../DB/queries/auth/query"
import { revalidatePath } from "next/cache"

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