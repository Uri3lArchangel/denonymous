'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { markAllAsReadQuery, updateNotificationOpenedStateQuery } from "../DB/queries/notifications/query"
import { redirect } from "next/navigation"
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { cookies } from "next/headers"

export const updateNotificationAction=async(id:number,owner:string)=>
{
try{ await updateNotificationOpenedStateQuery(id,owner)
 revalidatePath('/notifications')
 revalidateTag("notifications_fetch_tag")}catch(err:any){
    console.log(err)
    
 }

}


export const markAllAsReadAction=async()=>{
    try {
        const cookie = cookies().get("denon_session_0")
   if(!cookie || !cookie.value)redirect("/auth/signin")
   let user = verifyUserDataToken(cookie.value)
        if(!user)redirect("/auth/signin")
        await markAllAsReadQuery(user.email)
    revalidatePath("/notifications")
    revalidateTag("notifications_fetch_tag")
    } catch (error:any) {
        console.log(error)
        
    }
}