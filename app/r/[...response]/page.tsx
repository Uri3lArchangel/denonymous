import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import { Metadata } from 'next';
import ResponsePageComponent from './ResponsePageComponent';
let Responses:any
export const metadata: Metadata = {
  title: "Send A Response | Denonymous",
  description:
    "Engage with Denonymous responses on this page. Unauthenticated users can send text, image, video, and audio responses and view public responses in real-time. Authenticated users, as creators of the Denonymous, can view all responses but cannot send responses here. Other authenticated users can both send and view responses if enabled by the author",
  keywords: [
    "Denonymous",
    "anonymous messaging app",
    "response page",
    "text responses",
    "image responses",
    "video responses",
    "audio responses",
    "real-time responses",
    "authenticated users",
    "unauthenticated users",
    "public responses"
],
  robots: {
    index: true,
    follow: true,
  },
  
};



async function page({params}:{params:{response:string[]}}) {
  const [username_,key_]= params.response
  let key = decodeURI(key_)
  let username = decodeURI(username_)
  let userdata
  let isSession = false
  const cookie = cookies().get("denon_session_0")
  if(cookie){
   const verifyUserDataToken=((await import('@/src/core/lib/JWTFuctions')).verifyUserDataToken)

  const verify = verifyUserDataToken(cookie.value)
  userdata=verify
  if(verify){
    isSession=true
    }
}
return(
  <div className='backgroundVector py-8'>
  <ResponsePageComponent key_={key} username={username} userdata={userdata} isSession={isSession}/>
  </div>
)

}

export default page