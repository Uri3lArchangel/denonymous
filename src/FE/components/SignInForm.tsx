"use client";
import { signIn } from "next-auth/react";
import { useState, useContext } from "react";
import Link from "next/link";
import signin from '@/public/styles/styles.module.css'
import { NotificationContext } from "./contexts/NotificationContext";
import { EyeIcon, EyeOffIcon, ScanEyeIcon } from "lucide-react";
import { useSession } from "./hooks/SessionHook";
import GoogleSignInBtn from "./subcomponents/GoogleSignInBtn";

const SignInForm = () => {
  const [loading,setLoading]=useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {setSession}=useSession()
  const notification = useContext(NotificationContext)!
  const togglePasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  const credentialSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const display1 = document.getElementById("display1") as HTMLParagraphElement;
    const display2 = document.getElementById("display2") as HTMLParagraphElement;
    const form =document.getElementById("signinform") as HTMLFormElement
    display1.innerText=""
    display2.innerText=""
    
    const formdata = new FormData(form);
    if(String(formdata.get('email')).length == 0){
      display1.innerText="Enter your email address or username"
      display1.style.color="red"
      return
    }
    if(String(formdata.get('password')).length == 0){
      display2.innerText="Enter your password"
      display2.style.color="red"
      return
    }
    display1.innerText=""
    display2.innerText=""

    setLoading(true)
    const signinResponse = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });

      setLoading(false)
    if (signinResponse?.status == 200) {
      setSession(true)
      notification(
        {
          type:"success",
          message:"Sign in successfully",
          description:""
        }
      )
      setTimeout(()=>{window.location.href="/auth/verify-email"},2000)
    }else{

   const errorname=signinResponse?.error 
  notification(
        {
          type:"error",
          message:errorname!,
          description:""
        }
      )
    }
  };
  return (
    <>
    <form
    id="signinform"
      className={` shadow-div my-8 rounded-[15px] max-w-[400px] w-[95%] px-8 py-12 bg-[#020106] text-white ${signin.all}`}
    >
     
      <div className="text-center mb-14">
        <h2 className="font-bold text-[19px] my-3">Log in to your account</h2>
        <p className="text-sm italic text-[#c9c1c1c9] ">&quot;share and receive anonymous messages&quot;</p>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm mb-5">
          Your Email or Username:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email or Username"
          className=" border-b-2 border-[#B58419] w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
        />

      </div>
<p id="display1"></p>
      <div className="border-b-2 mb-10 border-[#B58419]">
        <label htmlFor="password" className="block text-sm mb-5">
          Your Password:
        </label>
        <div className="flex">
        <input
        type={showPassword ? 'text' : 'password'}
        name="password"
          id="password"
          placeholder="Enter Password"
          className="   h-fit w-full bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
        />
                    
        {showPassword ?  <EyeOffIcon className="cursor-pointer" onClick={togglePasswordVisibility} /> :  <EyeIcon className="cursor-pointer" onClick={togglePasswordVisibility} />}
      </div>
      </div>
<p id="display2"></p>

      <Link href={"/auth/reset-password"} className="underline text-[#ffdf00]">forgot password?</Link>
      <button
        type="submit"
   onClick={credentialSignIn}
   disabled={loading}
        className={"border-2  text-base text-black font-bold p-2 my-4 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] "+signin.signInBtn}
      >
        {loading?<div className="flex justify-center"><span>Signing in...</span></div>: <span>Sign In</span>}
      </button>
      <GoogleSignInBtn click={googleSignin} />


      <p className="text-center mt-3 text-sm line-break">
        Don&apos;t have an account?
        <Link className=" underline text-[#edc211]" href={"/auth/signup"}>
          <span className="">Sign Up</span>
        </Link>
      </p>
    </form>
    </>
  );
};

export default SignInForm;