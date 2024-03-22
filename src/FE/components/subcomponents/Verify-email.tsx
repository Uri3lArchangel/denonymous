'use client'
import { URLRESOLVE, validateEmail } from '@/src/core/lib/helpers'
import Image from 'next/image'
import React, { useRef } from 'react'
import logo from "../../../../public/images/logo.png";
import styles from "../../../../styles/styles.module.css";


const VerifyEmail = ({email}:{email:string}) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const changeEmail=async(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      const resp = document.getElementById("res") as HTMLParagraphElement
  if(!emailRef.current || !emailRef.current.value) {
    resp.innerText="Please provide an email address"
    resp.style.color="red"
    return
  }
  let response = validateEmail(emailRef.current.value)
  if(response.status == "error"){
    resp.innerText = "Invalid email format"
    resp.style.color="red"

    return
  }
  await fetch(URLRESOLVE("/api/resendEmailVerification"),{
    method:"POST",
    body:JSON.stringify({email:emailRef.current.value})
  })
    }

    const resend = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
  const res = await fetch(URLRESOLVE("/api/resendEmailVerification"),{method:"GET"})
    }
  return (
    <div
    className={
      `min-h-[100vh] py-6 flex items-center justify-center ` + styles.authBg
    }
  >
    <form
    className={`border border-[#EDC211] rounded-[15px] max-w-[400px] w-10/12 px-8 py-12 bg-[#020106] text-white ${styles.all}`}
  >
    <div className="flex justify-center mb-5">
      <Image src={logo} alt="logo" />
    </div>
    <h2 className='text-md text-[#ffdf00]'>Verification Link Sent To </h2>
    <button
      className={`border-2 text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
    >
      Resend Verification Link
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
    onClick={changeEmail}
      className={`border-2  text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] ${styles.signInBtn}`}
    >
      Change Email
    </button>
  </form> 
  
  </div> )
}

export default VerifyEmail