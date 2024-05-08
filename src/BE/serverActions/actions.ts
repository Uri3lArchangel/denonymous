"use server"

import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { cookies } from "next/headers"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { changeMediaSettingsQuery, changeResponsesVisibilityQuery, createDenonymous, deleteDenonymousDB, deleteDenonymousMediaBucketDB, denonymousViewStateChange, sendRelpy } from "../DB/queries/denonymous/query"
import { flipIndex } from "@/src/core/lib/helpers"


export const createDenonyous = async(topic:string,desc:string)=>{

try{
let cookie = cookies().get("denon_session_0")
if(!cookie || !cookie.value){
  redirect("/auth/signin")
}
const sessionToken = verifyUserDataToken(cookie.value)
if(!sessionToken){
  redirect("/auth/signin")
}



const res =await createDenonymous(sessionToken.email,String(topic),String(desc))
if(res.type=="error"){
  return res
}
revalidatePath("/")
revalidateTag("denonymous_box_0102")
revalidateTag("raieneidmie_00")
return res
}

catch(err:any){
  return {message:err.message,type:"error"}
}


}

export const sendRelpyAction = async(username:string,key:string,reply:any)=>{

try{    
  
    await sendRelpy(username,key,reply);
    revalidateTag("denonymous_box_0102")
    revalidateTag("raieneidmie_00")
}catch(err:any){
        console.log(err)
        return "an error occured"
    }
}

export const changeResponseViweViewState=async(topic:string)=>{

  let cookie = cookies().get("denon_session_0")
  if(!cookie || !cookie.value) redirect("/auth/signin")
  const sessionToken = verifyUserDataToken(cookie.value)
  if(!sessionToken) redirect("/auth/signin")
  try{    
      
      await denonymousViewStateChange(sessionToken.email,topic)
      revalidateTag("denonymous_box_0102")
      revalidateTag("raieneidmie_00")
  }catch(err:any){
          throw new Error("something went wrong!")
      }
}

export const changeDenonymousViewState=async(key:string)=>{

  
    try{    
      let cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
        await denonymousViewStateChange(sessionToken.email,key)
        revalidateTag("denonymous_box_0102")
        revalidateTag("raieneidmie_00")
    }catch(err:any){
            throw new Error("something went wrong!")
        }
}


export const deleteDenonymousAction=async(key_:string)=>{

    let cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value) redirect("/auth/signin")
    const sessionToken = verifyUserDataToken(cookie.value)
    if(!sessionToken) redirect("/auth/signin")
    try{    
      let r=   await deleteDenonymousMediaBucketDB(sessionToken.email,key_)
                if(!r) return
                for(let i=0;i<r.length;i++){
                  for(let j=0;j<r[i].media.length;j++){
                    
                    let a= await fetch(process.env.baseURL+"/api/edgestore/delete-file",{
                      method:'POST',
                      credentials:"include",
                      headers:{
                        "cookie":"edgestore-ctx="+cookies().get("edgestore-ctx")?.value
                      },
                      body:JSON.stringify({
                        bucketName:"denonymousMedia",
                        url:r[i].media[j].link
                      })
                    })  
                  console.log(a.headers)
                  }}
            revalidateTag("denonymous_box_0102")
            revalidateTag("raieneidmie_00")
            revalidateTag("notifications_fetch_tag");

    }catch(err:any){
            console.log(err)
            throw new Error("something went wrong!")
        }
}



export const changeResponsesVisibilityActiion = async (denonymousKey:string)=>{
  try{
  let cookie = cookies().get("denon_session_0")
  if(!cookie || !cookie.value) redirect("/auth/signin")
  const sessionToken = verifyUserDataToken(cookie.value)
  if(!sessionToken) redirect("/auth/signin")
  await changeResponsesVisibilityQuery(sessionToken.email,denonymousKey)
  revalidateTag("denonymous_box_0102")
  revalidateTag("raieneidmie_00")

}catch(err:any){
    console.log(err)
  }

}
export const changeMediaSettingsAction  = async(type:"image"|"video"|"audio",key:string,owner:string)=>{
try{
  console.log({media:key})
  let cookie = cookies().get("denon_session_0")
  if(!cookie || !cookie.value) redirect("/auth/signin")
  const sessionToken = verifyUserDataToken(cookie.value)
  if(!sessionToken) redirect("/auth/signin")
  await changeMediaSettingsQuery(type,owner,key)
  revalidateTag("denonymous_box_0102")
  revalidateTag("raieneidmie_00")
}catch(err:any){
  console.log(err)

}
}