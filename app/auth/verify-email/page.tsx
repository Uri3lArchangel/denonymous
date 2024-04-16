import React, { useRef } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import EmailVerificationComponent from "@/src/FE/components/subcomponents/EmailVerificationComponent";
import ResenVerificationCode from "@/src/FE/components/subcomponents/ResenVerificationCode";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";

async function page() {

  const cookie = cookies().get("denon_session_0")
  if(!cookie || !cookie.value){
    redirect("/auth/signin")
    return
  }
  const user = verifyUserDataToken(cookie.value)
  if(!user){
      redirect("/auth/signin")
    }
  

    return (  
      <div className="bg-black py-12 px-6 my-4 rounded-md w-[95%] mx-auto max-w-[400px] shadow-div">
    <Link href="/"><Image src={logo}  alt="denonymous" className="w-[60%] mx-auto"/></Link>

      <EmailVerificationComponent email={user.email} />
      <ResenVerificationCode email={user.email} />
      </div>
    )
    
}

export default page;