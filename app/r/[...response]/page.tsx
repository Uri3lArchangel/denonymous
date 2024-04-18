import { MultiFileDropzoneUsage } from '@/src/FE/components/subcomponents/MultiFileComponent';
import {  Replys } from '@/src/FE/components/subcomponents/d';
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions';
import { URLRESOLVE, filterDenonymous, filterMediaLimitOn, filterReplys } from '@/src/core/lib/helpers';
import { denonymousType, replyModelType, userModelType } from '@/types';
import { cookies } from 'next/headers';
import React from 'react'
import style from '../../../styles/styles.module.css'


async function fetchUser(username:string) {
  const res = await fetch(process.env.baseURL+"/api/fetchUserByusername",{method:"POST",mode:"no-cors",body:JSON.stringify({username}),next:{revalidate:false,tags:["raieneidmie_00"]}})
  const data =await res.json()
  return data.user
}

async function page({params}:{params:{response:string[]}}) {
  const [username_,topic_]= params.response
  let topic = decodeURI(topic_)
  let username = decodeURI(username_)
  let userdata

  let isSession = false
  const cookie = cookies().get("denon_session_0")
  
  if(cookie){
  const verify = verifyUserDataToken(cookie.value)
  userdata=verify
  if(verify){
    isSession=true
    }
}
  let all = (await fetchUser(username) as userModelType)
 
  let d = filterDenonymous(all,topic) as denonymousType
  if(!d.owner){
    throw new Error("This denonymous does not exist or has been deleted|client")
  }

  if((!d.isActive && userdata?.email != d.owner) || (!isSession && !d.isActive)){
    throw new Error("this denonmous is not active|client")
  }
  let replys = filterReplys(all,topic) as replyModelType[] ;
  let mediaLimit = filterMediaLimitOn(all,topic)

if(isSession && d.owner == userdata?.email){
  return (
    <div className={style.denonymousResponsePage+' py-4'}>
        <h1 className='text-3xl sm:text-4xl text-center text-ellipsis '>{d.topic}</h1>
        <h2 className='text-center text-[#7F7F7F] mb-20'>{d.description?d.description:''}</h2>
        <div  className='bg-[#1E1E1E]'>
    {!replys || replys.length == 0?<></>:<Replys replys={replys.reverse()} />}  
    </div> 
    </div>)
}else{
  return (
    <div className={style.denonymousResponsePage}>

      <div>
        {
        <main className='py-10'>
        <h1 className='text-4xl sm:text-4xl text-center text-ellipsis'>{d.topic}</h1>
        <h2 className='text-center text-[#7F7F7F] mb-20'>{d.description?d.description:''}</h2>

        <form id='reply_form' className='bg-[#1E1E1E] max-w-[578px] px-4 py-12 md:px-12 mx-auto md:h-fit'>
          <h3 className='text-center text-xl font-semibold gradient_elements_text'>Send Response</h3>
          <p className='text-center text-[#7F7F7F] py-4'>send text, photos, audios and even videos to {username}</p>
          <div className={style.formInputsContainer}>
          <textarea
        name="text_reply"
        id="response"
        className="block w-full md:w-[94%] mx-auto bg-[#0d0d0d] rounded-[10px] outline-none p-2 text-white/78 md:h-[200px] "
        rows={10}
      />
            {/* this is the div for everything upload */}

       <div>
 

          {mediaLimit?<></>:<MultiFileDropzoneUsage username={username} topic={topic} />}
      </div>
          </div>
     
    </form>

    
    </main>}     

     
    </div>
{!replys || replys.length == 0?<></>:<Replys replys={replys.reverse()} />}   
    </div>
  )}

}

export default page