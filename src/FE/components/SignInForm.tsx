'use client'
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SignInForm = () => {
  const router = useRouter()
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  const credentialSignIn=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const signinResponse=await signIn("credentials",{
      email:formdata.get("email"),
      password:formdata.get("password"),
      redirect:false
    })
    console.log(signinResponse);
    if(signinResponse?.status == 200){
      router.push("/")
    }
  }
  return (
    <form onSubmit={credentialSignIn}>
      <label>
        Email:
        <input type="email" name="email" id="email" />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          id="password"
        />
      </label>
      <br />
      <button type="submit">Sign In</button>
      <button type="button" onClick={googleSignin} className="border p-2 rounded">
            Sign In with Google
          </button>
    </form>
  );
};

export default SignInForm;
