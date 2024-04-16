"use client";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../../../styles/styles.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import signin from '../../../styles/styles.module.css'
import Loading from "@/app/loading";
import { NotificationContext } from "./contexts/NotificationContext";
import { FaEyeSlash } from "react-icons/fa";
import loader from '../../../public/images/spinner.gif'
import { EyeIcon, EyeOffIcon, ScanEyeIcon } from "lucide-react";
import { SessionContext } from "./contexts/SessionContext";
import { useSession } from "./hooks/SessionHook";

const SignInForm = () => {
  const [loading,setLoading]=useState(false)
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {setSession}=useSession()
  const notification = useContext(NotificationContext)!
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirect: false });
  };

  const credentialSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      setTimeout(()=>{window.location.href="/"},2000)
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
      className={` shadow-div backgroundVector my-8 rounded-[15px] max-w-[400px] w-[95%] px-8 py-12 bg-[#020106] text-white ${styles.all}`}
    >
        <Link href="/"><Image src={logo}  alt="denonymous" className="w-[60%] mx-auto"/></Link>
     
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
        {loading?<div className="flex justify-center"><Image src={loader} className="w-6 h-full filter brightness-[1]" alt="loader" /> <span>Signing in...</span></div>: <span>Sign In</span>}
      </button>
      {/* <button
        type="button"
        onClick={googleSignin}
        className={"border-2 border-[#fff] text-base font-bold  p-2 rounded  w-[200px] mx-auto flex items-center justify-center "+ signin.GoogleBtn}
      ><FcGoogle size={20} className="mx-[2px]" />
       <p className="">  Google Sign in</p>
      </button> */}

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