"use client";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { baseResponseType } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import styles from "../../../styles/styles.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import signin from "../../../styles/styles.module.css";

const SignUpForm = () => {
  const router = useRouter();
  // Inputs refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const unameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Google sign in function
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  // Credentials sign up function
  const SignupSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !emailRef ||
      !passwordRef ||
      !confirmPasswordRef ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current ||
      !unameRef.current
    ) {
      return;
    }
    // Perform email structure validity checks, password and confirm password checks and password strength checks here
    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username:unameRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };
    console.log(body);
    const res = await fetch(URLRESOLVE("/api/auth/sign-up"), {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      router.push("/auth/signin");
    }
    const data = (await res.json()) as baseResponseType;

    // Handle error using status codes, from the response,data.data is always null on error
    // e.g if(res.status == 400){ ...do something... }
    // data.message which is the message to be displayed to users
  };

  return (
    <>
      <form
        action=""
        className={`border border-[#EDC211] rounded-[15px] max-w-[400px] w-10/12 py-12 px-6 bg-[#020106] text-white ${styles.all}`}
      >
        <div className="flex justify-center mb-5">
          <Image src={logo} alt="logo" />
        </div>
        <div className="text-center mb-8">
          <h2 className="font-bold text-[19px] my-3">Create a new account</h2>
          <p className="text-sm">Share and receive anonymous messages</p>
        </div>
        <div>
          <label htmlFor="uname" >Username</label>
          <input
          ref={unameRef}
            type="text"
            name="uname"
            required
            id="uname"
            placeholder="Enter username"
            className="border-b-2 border-[#B58419] w-full mb-5 bg-transparent placeholder:text-[#c9c1c1c9] pb-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-3">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            id="email"
            placeholder="Enter email"
            className="border-b-2 border-[#B58419] w-full mb-5 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none pb-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-3">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            required
            id="password"
            placeholder="Enter password"
            className="border-b-2 border-[#B58419] w-full mb-5 bg-transparent placeholder:text-[#c9c1c1c9] pb-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-3">
            Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm password"
            className="border-b-2 border-[#B58419] w-full mb-5 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none pb-2"
          />
        </div>
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            name="termsAndConditions"
            id="termsAndConditions"
            className="bg-transparent border-[#B58419] border-2 w-3 h-3 mr-2 focus:outline-none"
          />
          <label
            htmlFor="termsAndConditions"
            className="text-[#c9c1c1c9] text-sm cursor-pointer"
            
          >
            Accept Terms and Conditions
          </label>
        </div>
        <div>
          <button
            type="submit"
            className={
              "border-2  text-base text-black font-bold p-2 my-12 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] " +
              signin.signInBtn
            }
            onClick={SignupSubmit}
          >
            Submit
          </button>
          {/* <button
            type="button"
            className={
              "border-2 border-[#edc211] text-[#edc211] text-base font-bold  p-2 rounded  w-[200px] mx-auto flex items-center justify-center " +
              signin.GoogleBtn
            }
            onClick={googleSignin}
          >
            <FcGoogle size={20} className="mx-[2px]" />
            <p className=""> Google Sign in</p>
          </button> */}
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link className=" underline text-[#edc211]" href={"/auth/signin"}>
            <span className="">Sign In</span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
