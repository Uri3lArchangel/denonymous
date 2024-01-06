"use client";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { baseResponseType } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const SignUpForm = () => {
  const router=useRouter()
  // Inputs refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Google sign in function
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  // Credentials sign up function
  const SignupSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      !emailRef ||
      !passwordRef ||
      !confirmPasswordRef ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    ) {
      return;
    }
    // Perform email structure validity checks, password and confirm password checks and password strength checks here

    
    const body ={
      email:emailRef.current.value,
      password:passwordRef.current.value,
      confirmPassword:confirmPasswordRef.current.value
    }
    console.log(body)
    const res = await fetch(URLRESOLVE("/api/auth/sign-up"),{
      method:"POST",
      mode:"no-cors",
      cache:"no-cache",
      body:JSON.stringify(body)
    })
if(res.status == 201){
  router.push("/auth/signin")
}
    const data = await res.json() as baseResponseType

    // Handle error using status codes, from the response,data.data is always null on error
    // e.g if(res.status == 400){ ...do something... }
    // data.message which is the message to be displayed to users

    
  };

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input
          ref={emailRef}
            type="email"
            name="email"
            required
            id="email"
            placeholder="Enter email"
            className="border border-rounded border-gray-400"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          ref={passwordRef}
            type="password"
            name="password"
            required
            id="password"
            placeholder="Enter password"
            className="border rounded border-gray-400"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
          ref={confirmPasswordRef}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm password"
            className="border rounded border-gray-400"
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="termsAndConditions"
            id="termsAndConditions"
          />
          <label htmlFor="termsAndConditions">
            Accept Terms and Conditions
          </label>
        </div>
        <div>
          <button type="submit" className="border p-2 " onClick={SignupSubmit}>
            Submit
          </button>
          <button
            type="button"
            className="border p-2 rounded"
            onClick={googleSignin}
          >
            Sign In with Google
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
