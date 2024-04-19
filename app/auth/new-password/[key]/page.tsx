import { checkIfTokenIsValid } from '@/src/BE/DB/queries/auth/query'
import NewPasswordForm from '@/src/FE/components/subcomponents/NewPasswordForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/public/images/logo.png";
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'New Password | Denonymous',
  robots:{
    index:false,
    follow:false
  },
 
}


async function page({params}:{params:{key:string}}) {
  const key = params.key
 const res = await checkIfTokenIsValid(key)
 if(res){
  return (
    <div className="shadow-div bg-black rounded-md w-[60%] max-w-[300px] text-center py-12 text-white">
    <Link href="/"><Image src={logo}  alt="denonymous" className="w-[60%] mx-auto"/></Link>
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