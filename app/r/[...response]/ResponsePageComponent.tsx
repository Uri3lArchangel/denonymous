import React from 'react'
import {  fetchUser, filterMediaLimitOn} from '@/src/core/lib/helpers';
import { denonymousType, userDataJWTType, userModelType } from '@/types';
import dynamic from 'next/dynamic';
import { EdgeStoreProvider } from '@/src/core/lib/edgestore';
import style from '@/public/styles/styles.module.css'
import { MultiFileDropzoneUsage } from '@/src/FE/components/subcomponents/MultiFileComponent';
let Responses:any=null



async function ResponsePageComponent({username,userdata,key_,isSession}:{username:string,userdata?:userDataJWTType,key_:string,isSession:boolean}) {
    const key = key_

    let all = await fetchUser(username) as userModelType

    if(!all){
      throw new Error("The owner of this denonymous was not found|client")
    
          }
    
      const filterDenonymous = (await import('@/src/core/lib/helpers')).filterDenonymous
    
      let d = filterDenonymous(all,key) as denonymousType
      if(!d.owner){
    
        throw new Error("This denonymous does not exist or has been deleted|client")
      }
    
      if((!d.isActive && userdata?.email != d.owner) || (!isSession && !d.isActive)){
        throw new Error("This denonmous is not active|client")
      }
    
    
     let replys = d.replys
     
    
    if(isSession && d.owner == userdata?.email){
    Responses = dynamic(()=>import('@/src/FE/components/subcomponents/Responses'))
    
      return (
       <>
        <div className={style.denonymousResponsePage+' py-4'}>
            <h1 className='text-3xl sm:text-4xl text-center text-ellipsis '>{d.topic}</h1>
            <h2 className='text-center text-[#7F7F7F] mb-20'>{d.description?d.description:''}</h2>
            <div  className='bg-[#1E1E1E]'>
        {Responses && <Responses box={d.topic}  owner={d.owner} responses={replys.reverse()} />}  
        </div> 
        </div>
        
        </> )
    }else{
      Responses = dynamic(()=>import('@/src/FE/components/subcomponents/Responses'))
    
      let mediaLimit = filterMediaLimitOn(all.denonymous,key)
      return (
        <div className={style.denonymousResponsePage}>
          <div>
            {
            <main className='py-10'>
            <h1 className='text-4xl sm:text-4xl text-center text-ellipsis'>{d.topic}</h1>
            <h2 className='text-center text-[#7F7F7F] mb-20'>{d.description?String(d.description):''}</h2>
    
            <form id='reply_form' className='bg-[#1E1E1E] rounded-md  max-w-[578px] px-4 py-12 md:px-12 mx-auto md:h-fit'>
              <h3 className='text-center text-xl font-semibold gradient_elements_text'>Send Response</h3>
              <p className='text-center text-[#7F7F7F] py-4'>send text, photos, audios and even videos to {username}</p>
              <div className={style.formInputsContainer+' shadow-div'}>
              <textarea
              maxLength={1250}
            name="text_reply"
            id="response"
            className="block w-full md:w-[94%] mx-auto bg-[#0d0d0d] rounded-[10px] outline-none p-2 text-white/78 md:h-[200px] "
            rows={10}
          />
           <div>
     
           <EdgeStoreProvider>
    
              <MultiFileDropzoneUsage username={username} key_={key} mediaLimit={mediaLimit} />
        </EdgeStoreProvider>
    
          </div>
              </div>
         
        </form>
    
        
        </main>}     
    
         
        </div>
    {Responses && <Responses owner={d.owner} responses={replys.reverse()} />}   
        </div>
      )}
            
}

export default ResponsePageComponent