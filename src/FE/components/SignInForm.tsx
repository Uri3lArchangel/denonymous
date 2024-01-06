"use client";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import styles from "../../../styles/styles.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import signin from '../../../styles/styles.module.css'

const SignInForm = () => {
  const router = useRouter();
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  const credentialSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const signinResponse = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });
    if (signinResponse?.status == 200) {
      router.push("/");
    }else{
// handle error here 
const errorname=signinResponse?.error 

    }
  };
  return (
    <form
      onSubmit={credentialSignIn}
      className={`border border-[#EDC211] rounded-[15px] max-w-[400px] w-10/12 px-8 py-12 bg-[#020106] text-white ${styles.all}`}
    >
      <div className="flex justify-center mb-5">
        <Image src={logo} alt="logo" />
      </div>
      <div className="text-center mb-14">
        <h2 className="font-bold text-[19px] my-3">Log in to your account</h2>
        <p className="text-sm">share and receive anonymous messages</p>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm mb-5">
          Your Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          className=" border-b-2 border-[#B58419] w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm mb-5">
          Your Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          className=" border-b-2 border-[#B58419] w-full mb-16 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className={"border-2  text-base text-black font-bold p-2  border-[#EDC211] rounded mb-3 block w-[200px] mx-auto "+signin.signInBtn}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={googleSignin}
        className={"border-2 border-[#fff] text-base font-bold  p-2 rounded  w-[200px] mx-auto flex items-center justify-center "+ signin.GoogleBtn}
      ><FcGoogle size={20} className="mx-[2px]" />
       <p className="">  Google Sign in</p>
      </button>
      <p className="text-center mt-3">
        Don&apos;t have an account?
        <Link className=" underline text-[#edc211]" href={"/auth/signup"}>
          <span className="">Sign Up</span>
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
