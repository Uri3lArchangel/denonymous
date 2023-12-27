import {cookies} from 'next/headers'

export const setSessionCookie = (token:string)=>{
    cookies().delete("denon_session_0")
    cookies().set("denon_session_0",token,{
        maxAge:2592000, // 30 days = 3600 seconds * 24 * 30,
        secure:true,
        httpOnly:true,
    })
}