import { revalidateTag } from 'next/cache'
import {cookies} from 'next/headers'

export const setSessionCookie = (token:string)=>{
    revalidateTag("notifications_fetch_tag")
    cookies().delete("denon_session_0")
    cookies().set("denon_session_0",token,{
        maxAge:2592000, // 30 days = 3600 seconds * 24 * 30,
        secure:true,
        httpOnly:true,
    } )

}

export const setPointsCookie = (token:string)=>{
    cookies().delete("denon_points")
    cookies().set("denon_points",token,{
        maxAge:25920000, // 300 days = 3600 seconds * 24 * 30 * 10,
        secure:true,
        httpOnly:true,
    } )

}



export const deleteSessionCookie=()=>{
    cookies().delete("denon_session_0")
}

export const deletePointsCookie=()=>{
    cookies().delete("denon_points")
}