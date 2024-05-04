'use client'
import { URLRESOLVE, formatTime, validateEmail } from '@/src/core/lib/helpers'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from "../../../../public/images/logo.png";
import styles from "../../../../styles/styles.module.css";
import { NotificationContext } from '../contexts/NotificationContext';


const VerifyEmail = ({email}:{email:string}) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const [countdown,setCountdown]=useState(0)
    const [pending,setPending]=useState(false)
    const notification = useContext(NotificationContext)!
  
    useEffect(() => {
      let timerId: NodeJS.Timeout;
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
  if(!emailRef.current){
return
  }
  setPending(true)
  const res = await fetch(URLRESOLVE("/api/resendEmailVerification"),{method:"POST",body:JSON.stringify({newEmail:emailRef.current.value})})
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
    className={` rounded-[15px] max-w-[400px] backgroundVector shadow-div w-10/12 px-8 py-12 bg-[#020106] text-white ${styles.all}`}
  >
  
    <h2 className='text-md text-[#ffdf00]'>Verification Link Sent To </h2>
    <button
    disabled={pending || countdown >0}
      className={`border-2 text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
      onClick={
    resend
      }
    >
      {countdown>0?formatTime(countdown * 1000):"Resend Verification Link"}
    </button>
    <div>
      <label htmlFor="email_change" className="block text-sm mb-5">
        Enter New Email
      </label>
      <input
      ref={emailRef}
        type="email"
        id="email_change"
        placeholder="abc...@gmail.com"
        className=" border-b-2 border-[#B58419] w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
      />
    </div>
    <p id="res"></p>
    <button
    disabled={pending || countdown >0}

  onClick={
    
      resend
    
  }    
      className={`border-2  text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
    >
      {countdown>0?formatTime(countdown * 1000):"Change Email"}
    </button>
    <p id='error_display'></p>
  </form> 
  
)
}

export default VerifyEmail