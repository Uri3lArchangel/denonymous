'use client'
import { URLRESOLVE, formatTime } from '@/src/core/lib/helpers'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'


function ResenVerificationCode({email}:{email:string}) {
    const [countdown,setCountdown]=useState(0)
    const [pending,setPending]=useState(false)
    const notification = useContext(NotificationContext)!
  
    useEffect(() => {
      let timerId: NodeJS.Timeout;
      if(countdown == 0){
        const p = document.getElementById("error_display") as HTMLParagraphElement;
        if(p.innerText){
          p.innerText = "All good! You can request now";p.style.color="limegreen"
          setTimeout(()=>{
            p.innerText=""
          },1000)
        }
      }
      if(countdown>0){
        timerId = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 0) {
              clearInterval(timerId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

      }
    

      return () => {
        clearInterval(timerId);
      };
    }, [countdown]);
    const resend = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
   
      setPending(true)
      const res = await fetch(URLRESOLVE("/api/resendEmailVerification"),{method:"POST",body:JSON.stringify({newEmail:email})})
      const status = await res.json()
      const d = document.getElementById("error_display") as HTMLParagraphElement;
      setPending(false)
      d.innerText=""
      if(status.type =="warning"){
          setCountdown((Number(status.timer) - Date.now())/1000)
          d.innerText=status.message
          d.style.color="red"
          return
      }
      if(status.type == "success"){
        notification({
          message:status.message,
          type:"success",
          description:""
        })
        return
     
      }
      if(status.type == "error"){
        notification({
          message:status.message,
          type:"error",
          description:""
        })
        return
      }
        }
  return (
   <form
    className={` `}
  >
     <button
    disabled={pending || countdown >0}
      className={` text-base text-black font-bold p-2 px-4 my-4 border-0 rounded mb-3 block w-[100%] mx-auto sm:w-[200px] gradient_elements_text`}
      onClick={
    resend
      }
    >
      {pending?"Resending.....":countdown>0?formatTime(countdown * 1000):"Resend Code"}
    </button>
    <p id='error_display' className='text-center'></p>
    </form>
    )
}

export default ResenVerificationCode