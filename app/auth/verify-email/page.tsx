import React, { useRef } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import EmailVerificationComponent from "@/src/FE/components/subcomponents/EmailVerificationComponent";
import ResenVerificationCode from "@/src/FE/components/subcomponents/ResenVerificationCode";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Email Verification | Denonymous',
 description:"Verify your email address to access Denonymous. Enter the OTP (One-Time Password) sent to your email or change the registered email address if needed. Access to the dashboard is granted upon successful email verification",
 keywords:[
  "Denonymous",
  "anonymous messaging app",
  "email verification",
  "OTP",
  "One-Time Password",
  "registered email",
  "dashboard access"
],
robots:{
  index:true,
  follow:true
}
}

 function page() {

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
      <div className="bg-black py-12 px-6 my-4 min-w-full rounded-md w-[95%] mx-auto max-w-[600px] shadow-div">

      <EmailVerificationComponent email={user.email} />
      <ResenVerificationCode email={user.email} />
      </div>
    )
    
}

export default page;