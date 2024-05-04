import React, { useRef } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { Metadata } from "next";
import Tabs from "./Tabs";

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
      <div className="bg-black py-12 px-6 my-4  rounded-md w-[95%] mx-auto max-w-[600px] shadow-div">

   <Tabs  user={user} />
      </div>
    )
    
}

export default page;