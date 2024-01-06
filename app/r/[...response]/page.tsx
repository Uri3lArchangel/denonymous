import { MultiFileDropzoneUsage } from '@/src/FE/components/subcomponents/MultiFileComponent';
import {  Replys } from '@/src/FE/components/subcomponents/d';
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions';
import { URLRESOLVE, filterMediaLimitOn, filterReplys } from '@/src/core/lib/helpers';
import { replyModelType, userModelType } from '@/types';
import { cookies } from 'next/headers';
import React from 'react'


async function fetchUser(UUID:string) {
  const res = await fetch(process.env.baseURL+"/api/fetchUserByUUID",{method:"POST",mode:"no-cors",body:JSON.stringify({UUID}),next:{revalidate:false,tags:["raieneidmie_00"]}})
  const data =await res.json()
  return data.user
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
  let all = (await fetchUser(uuid) as userModelType)
  let replys = filterReplys(all,topic) as replyModelType[] ;
  console.log(replys)
  let mediaLimit = filterMediaLimitOn(all,topic)


  return (
    <div className=''>
      <div>
          <form id='reply_form'>
      <label htmlFor="response" className="block">
        Write a response
      </label>
      <textarea
        name="text_reply"
        id="response"
        cols={30}
        className="block border-2"
        rows={10}
      />
            {/* this is the div for everything upload */}

       <div>
          {mediaLimit?<></>:<MultiFileDropzoneUsage UUID={uuid} topic={topic} />}
      </div>
    </form>       

     
    </div>
{!replys || replys.length == 0?<></>:<Replys replys={replys} />}   
    </div>
  )
}

export default page