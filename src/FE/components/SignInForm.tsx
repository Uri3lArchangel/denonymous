"use client";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import Image from "next/image";
import styles from "../../../styles/styles.module.css";
import Link from "next/link";

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
    console.log(signinResponse);
    if (signinResponse?.status == 200) {
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={credentialSignIn}
      // className=""
      className={`border border-[#EDC211] rounded-[15px] max-w-[400px] w-10/12 px-8 py-12 bg-[#020106] text-white ${styles.all}`}
    >
      <div className="flex justify-center mb-5">
        <Image src={logo} alt="logo" />
      </div>
      <div className="text-center mb-14">
        <h2 className="font-bold text-[24px]">Sign In</h2>
        <p className="text-sm">De collaborator is the best is not</p>
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
        className="border-2 bg-[#EDC211] text-base text-black font-bold p-2  border-[#EDC211] rounded mb-3 block w-[200px] mx-auto"
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={googleSignin}
        className="border-2 bg-[#EDC211] text-base text-black font-bold border-[#EDC211]  p-2 rounded block w-[200px] mx-auto"
      >
        Sign In with Google
      </button>
      <p className="text-center mt-3">
        Don't have an account,{" "}
        <Link href={"/auth/signup"}>
          <span className="text-[#edc211]">Sign Up</span>
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
