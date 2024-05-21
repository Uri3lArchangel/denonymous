import { checkIfTokenIsValid } from '@/src/BE/DB/queries/auth/query'
import NewPasswordForm from '@/src/FE/components/subcomponents/NewPasswordForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/public/images/logo.avif";
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'New Password | Denonymous',
  description:" Recover access to your Denonymous account by resetting your password. Enter your email address, and a password reset link will be sent to your email inbox. Follow the instructions in the email to create a new password and regain access to your account.",
  keywords:[
    "Denonymous",
    "anonymous messaging app",
    "reset password",
    "password recovery",
    "account access",
    "email",
    "password reset link"
],
  robots:{
    index:true,
    follow:true
  },
 
}


async function page({params}:{params:{key:string}}) {
  const key = params.key
 const res = await checkIfTokenIsValid(key)
 if(res){
  return (
    <div className="shadow-div bg-black rounded-md w-[60%] max-w-[300px] text-center py-12 text-white">
      {res}
      <Link href="/auth/reset-password" className="authBtnBgFill  block w-fit mx-auto my-4" >Password Reset</Link>
    </div>
  )
 }else{
return (
<NewPasswordForm token={key} />
  )
}
}

export default page