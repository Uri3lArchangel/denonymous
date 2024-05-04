'use client'
import React from 'react'
import PasswordRestFormButton from './PasswordRestFormButton'
import Image from 'next/image'
import logo from "@/public/images/logo.avif";
import { useFormState } from 'react-dom';
import { sendResetLink } from '../serverActions/authactions';
import styles from "@/public/styles/styles.module.css";
import SixDigitInputField from '@/src/FE/components/subcomponents/SixDigitInputField';
import Link from 'next/link';

function PasswordResetForm() {
    const  initialState={
        type:'' as 'success'|'error'|'warning',message:'' ,time:0 
      }
    const [state,formAction]= useFormState(sendResetLink,initialState)

  return (
    <>
    <form

    action={formAction}
      className={`  border border-[#EDC211] rounded-[15px] max-w-[500px] w-10/12 px-12 py-20 bg-[#020106] text-white ${styles.all}`}
    >
        {/* <Link href="/"><Image src={logo}  alt="denonymous" className="w-[60%] mx-auto"/></Link> */}

      <div>
        <h1 className='text-2xl font-bold mb-2'>Reset your password</h1>
        <label htmlFor="email_change" className="block text-sm mb-5">
          Enter Your Email Address
        </label>
        <input
          type="email"
          id="email_change"
          name='email_change'
          placeholder="abc...@gmail.com"
          className=" border-b-2 border-[#B58419] w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
        />
      </div>
{state.time && state.time == 0 ? <></>: <p className='text-red-500'>{(state.type == "error" ||state.type == "warning" ) && state.message}</p>}

    <PasswordRestFormButton state={state} />
    </form> 
    </> )
}

export default PasswordResetForm