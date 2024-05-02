import SignInForm from "@/src/FE/components/SignInForm";
import { Metadata } from "next";
import React from "react";


export const metadata:Metadata = {
  title: 'Sign in | Denonymous',
 description:"Log in to Denonymous, the anonymous messaging platform where users can create custom response boxes to receive anonymous text, images, videos, and audio responses on any topic. Provide your username or email and password to access your account. Forgot your password? Use the password recovery feature",
 keywords:[
  "Denonymous",
  "anonymous messaging app",
  "sign in",
  "log in",
  "account authorization",
  "response box",
  "custom responses",
  "username",
  "email",
  "password",
  "password recovery"
],
robots:{
  index:true,
  follow:true
}
}
function page() {

  return (
    <>
     

        <SignInForm />
      
    </>
  );
}

export default page;
