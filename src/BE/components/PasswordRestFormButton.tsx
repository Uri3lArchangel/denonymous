'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import styles from "@/public/styles/styles.module.css";
import { formatTime } from '@/src/core/lib/helpers';
import { NotificationContext } from '@/src/FE/components/contexts/NotificationContext';

const PasswordRestFormButton = ({state}:{state:{type:'success'|'error'|'warning'|string,message?:string,time?:number} }) => {
  const {pending} = useFormStatus()
  const [countdown,setCountdown]=useState(0)
  const notification = useContext(NotificationContext)!

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (state.type === 'warning' || state.type === 'success' ) {
      const initialCountdown = (state.time!-Date.now()) / 1000; // Convert milliseconds to seconds
      setCountdown(initialCountdown);

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

if(state.type == 'success'){
  notification({
    message:"Check your email for reset link",
    type:"success",
    description:""
  })
}
    return () => {
      clearInterval(timerId);
    };
  }, [state.type, state.message,notification,state.time]);

  
  return (
    <>
    <button
    disabled={pending || countdown >0}
    className={`border-2  disabled:filter disabled:brightness-[0.8]  text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
  >
      {state.type === "warning" || state.type === "success" ? (countdown > 0 ? formatTime(countdown * 1000) : "Send Reset Link") : (pending ? "Sending...." : "Send Reset Link")}
  </button> 
{countdown>0 ? <p className='text-sm text-gray-300 text -center'>Wait for timer before you can send another email</p> :null
}  </>)
}

export default PasswordRestFormButton