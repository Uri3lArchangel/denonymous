import React from "react";
import PasswordResetForm from "@/src/BE/components/PasswordResetForm";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Password Reset | Denonymous',
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

function page() {
  
  return (

 <PasswordResetForm />
  );
}

export default page;