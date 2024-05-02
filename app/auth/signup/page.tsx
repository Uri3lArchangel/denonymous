import React from "react";
import SignUpForm from "../../../src/FE/components/SignUpForm";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: 'Sign Up | Denonymous',
 description:"Join Denonymous, the anonymous messaging platform where users can create custom response boxes to receive anonymous text, images, videos, and audio responses on any topic. Sign up for an account by providing your username, email, and password. Accept the terms and conditions to proceed",
 keywords:[
  "Denonymous",
  "anonymous messaging app",
  "sign up",
  "create account",
  "response box",
  "custom responses",
  "username",
  "email",
  "password",
  "terms and conditions"
],
robots:{
  index:true,
  follow:true
}
}
function page() {
  return (
    <>
      
        <SignUpForm />
    </>
  );
}

export default page;
