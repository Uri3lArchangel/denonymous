import { fetchDenonymousOnLoad } from '@/src/FE/components/CreatePosts'
import { MyDenonyms } from '@/src/FE/components/subcomponents/CreatePosts';
import { Reply_Form, Replys } from '@/src/FE/components/subcomponents/d';
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions';
import { URLRESOLVE } from '@/src/core/lib/helpers';
import { replyModelType } from '@/types';
import { cookies } from 'next/headers';
import React from 'react'


async function fetchDenonyms(UUID:string,topic:string) {
  const res = await fetch(process.env.baseURL+"/api/fetchAllReplys",{method:"POST",mode:"no-cors",body:JSON.stringify({UUID,topic}),next:{revalidate:false}})
  const data =await res.json()
  return data.replys
}

async function page({params}:{params:{response:string[]}}) {
  const [uuid,topic]= params.response
  let isSession = false
  const cookie = cookies().get("denon_session_0")
  if(cookie){
  const verify = verifyUserDataToken(cookie.value)
  if(verify){
    isSession=true
  }
  }
  let replys = await fetchDenonyms(uuid,topic) as replyModelType[] ;
  return (
    <div>
          <div>
          <Reply_Form />
       
    </div>
{!replys || replys.length == 0?<></>:<Replys replys={replys} />}   
    </div>
  )
}

export default page