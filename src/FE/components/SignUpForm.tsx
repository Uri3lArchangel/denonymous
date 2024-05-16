"use client";
import { URLRESOLVE, validateEmail, validateUsername } from "@/src/core/lib/helpers";
import { baseResponseType } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import signin from "@/public/styles/styles.module.css";
import Loading from "@/app/loading";
import { NotificationContext } from "./contexts/NotificationContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {FcGoogle} from 'react-icons/fc'
import GoogleSignInBtn from "./subcomponents/GoogleSignInBtn";

const SignUpForm = () => {
  // states
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [loading,setLoading]=useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);



  // contexts
  const notification = useContext(NotificationContext)!

  // routers 
  const router = useRouter();



  // functions

/**
 * Calculates the strength of each feature of the password
 * @param {string} pass 
 * @returns {number} score 
 */

  const calculateStrength = (pass: string) => {
    let score = 0;

    // Check for length
    if (pass.length>0) {

      score += 1;
    }
    if (pass.length >= 8 ) {
      score += 1;
    }

    // Check for lowercase and uppercase letters
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      score += 1;
    }

    // Check for digits
    if (/\d/.test(pass)) {
      score += 1;
    }

    // Check for special characters
    if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(pass)) {
      score += 1;
    }

    return score;
  };

  /**
   * Handles the on change event on the password input
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = document.getElementById("pass_display") as HTMLParagraphElement;
    let d = document.getElementById('password_display') as HTMLParagraphElement;

    p.innerHTML=""

    
    const pass = e.target.value;
    setPassword(pass);
    const strengthScore = calculateStrength(pass);
    setStrength(strengthScore);
    if(confirmPasswordRef.current?.value != pass){
        d.innerText = "Passwords do not match"
        d.style.color="red"
      }else{
        d.innerText = ""
      }
  };

  /**
   * Picks a specific color based on the strength level
   * @returns 
   */

  const getColor = () => {
    
    if (strength === 0) return 'red';
    if (strength === 1) return 'red';
    if (strength <= 2) return 'orange';
    if (strength <= 3) return 'yellow';
    if (strength <= 4) return 'yellowgreen';
    if (strength <= 5) return 'green';
    return '';
  };

  /**
   * Checks when the confirm password input changes in order to compare it with the password input field
   * @param e 
   */
  const confirmPasswordCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    let d = document.getElementById('password_display') as HTMLParagraphElement;
  
  if(e.currentTarget.value != passwordRef.current!.value){
    d.innerText = "Passwords do not match"
    d.style.color="red"
  }else{
    d.innerText = ""
  }
  }
/**
 * Changes the visibility state of password
 * @param e 
 */
  const togglePasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword2(!showPassword2);
  };


  // Inputs refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const unameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Google sign in function
  const googleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const a = await signIn("google", { redirect: false,callbackUrl:"/api/auth/callback/google" });
    if(a?.error){
      notification({type:"error",message:a.error,description:""})
    }
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
    let email_display=(document.getElementById("email_display") as HTMLParagraphElement)
    let uname_display=(document.getElementById("uname_display") as HTMLParagraphElement)
    let d = document.getElementById('password_display') as HTMLParagraphElement;
    const terms = document.getElementById("termsAndConditions") as HTMLInputElement;
    const pass = document.getElementById("pass_display") as HTMLDivElement;

    

    email_display.innerText="";
    uname_display.innerText=""
    d.innerText=""
    terms.innerText=""
    pass.innerText=""
    
    if(unameRef.current.value.length == 0){
      uname_display.innerText="Provide a username";
     uname_display.style.color="red"

      return
    }
    if(!validateUsername(unameRef.current.value)){
      uname_display.innerText="Invalid character in username";
      uname_display.style.color="red"
 
       return
    }
    if(emailRef.current.value.length == 0){
      email_display.innerText="Provide an email address";
      email_display.style.color="red"

      return
    }
    let s = validateEmail(emailRef.current.value)
    if(s.status == "error")
    {
      email_display.innerText="Invalid email address";
      email_display.style.color="red"

      return
    }
    if(strength == 0){
      pass.innerText="Provide a password"
      pass.style.color="red"
      return

    }
    if(passwordRef.current.value.length ==0){
      d.innerText="Confirm your password"
      d.style.color="red"
      return

    }
    if(strength <3){

      return
    }
    if(passwordRef.current.value != confirmPasswordRef.current.value){
      d.innerText = "Passwords do not match"
      d.style.color="red"
      return
    }
    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username:unameRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };
    if(!terms.checked){
     (document.getElementById("terms_display") as HTMLInputElement ).innerText="Please check the terms and conditions box";
     (document.getElementById("terms_display") as HTMLInputElement ).style.color='red'
     return

    }
    email_display.innerText="";
    uname_display.innerText=""
    d.innerText=""
    terms.innerText=""
    pass.innerText=""
    setLoading(true)
    const res = await fetch(URLRESOLVE("/api/auth/sign-up"), {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
    
      await signIn("credentials", {
        email: body.email,
        password: body.password,
        redirect: false,
      });
    setLoading(false)

      notification({
        message:'Account created successfully',
        type:"success",
        description:""
      })

      setTimeout(()=>{router.push("/auth/verify-email")},2000)
    }
    setLoading(false)

    const data = (await res.json()) as baseResponseType;
    if(res.status == 400 || res.status == 500){
      notification({
        message:data.message,
        type:"error",
        description:""
      })
    }
    // Handle error using status codes, from the response,data.data is always null on error
    // e.g if(res.status == 400){ ...do something... }
    // data.message which is the message to be displayed to users
  };

  return (
    <>
   {loading? <Loading  />:null}
      <form
        action=""
        id="form_signup"
        className={`border shadow-div w-[95%] rounded-[15px] max-w-[450px]  border-none my-8 py-12 px-10 bg-[#020106] text-white ${signin.all}`}
      >
        <div className="text-center mb-8">
          <h2 className="font-bold text-[19px] my-3">Create a new account</h2>
          <p className="text-sm italic text-[#c9c1c1c9] ">&quot;share and receive anonymous messages&quot;</p>
        </div>
        <fieldset>
        <div>
          <label htmlFor="uname" className=" block" >Username *</label>
          <input
          ref={unameRef}
            type="text"
            name="uname"
            required
            id="uname"
            placeholder="Enter username"
            className="border-b-2 border-[#B58419] w-full mb-2 bg-transparent placeholder:text-[#c9c1c1c9] pb-2 focus:outline-none"
          />
        </div>
        <p id="uname_display" className="mb-4"></p>

        <div>
          <label htmlFor="email" className="block text-sm">
            Email *
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            id="email"
            placeholder="Enter email"
            className="border-b-2 border-[#B58419] w-full mb-1 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none pb-2"
          />
        </div>
        <p id="email_display" className="mb-4"></p>
        <div>
          <label htmlFor="password" className="block text-sm ">
            Password *
          </label>
          <div>
            <div className="flex border-b-2 border-[#B58419] mb-2">  
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
            className=" w-full bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
          />
        {showPassword ?  <EyeOffIcon className="cursor-pointer" onClick={togglePasswordVisibility} /> :  <EyeIcon className="cursor-pointer" onClick={togglePasswordVisibility} />}
</div>
      <div style={{ color: getColor() }} >
      {strength === 1 && 'Very Weak'}
        {strength === 2 && 'Weak'}
        {strength === 3 && 'Moderate'}
        {strength === 4 && 'Strong'}
        {strength === 5 && 'Very Strong'}
      </div>
    </div>
      <p id="pass_display" className="mb-4"></p>
          
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-2">
            Confirm Password *
          </label>
          <div className="flex border-b-2 border-[#B58419] mb-1">  

          <input
            ref={confirmPasswordRef}
            type={showPassword2 ? 'text' : 'password'}
            name="confirmPassword"
            onChange={confirmPasswordCheck}
            id="confirmPassword"
            required
            placeholder="Confirm password"
            className=" w-full  bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none pb-2"
          />
                  {showPassword2 ?  <EyeOffIcon className="cursor-pointer" onClick={toggleConfirmPasswordVisibility} /> :  <EyeIcon className="cursor-pointer" onClick={toggleConfirmPasswordVisibility} />}

          </div>
        </div>
        <p id="password_display" className="mb-6"></p>
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            name="termsAndConditions"
            id="termsAndConditions"
            className="bg-transparent cursor-pointer border-[#B58419] border-2 w-3 h-3 mr-2 focus:outline-none"
          />
          <label
            htmlFor="termsAndConditions"
            className="text-[#c9c1c1c9] text-sm cursor-pointer"
            
          >
            Accept <Link href="/terms" target="_blank" className="underline text-[#EDC211]">Terms and Conditions</Link>
          </label>
        </div>
        <p id="terms_display"></p>
        </fieldset>
        <div>
          
          <button
            type="submit"
            className={
              "border-2  text-base text-black font-bold p-2 my-12 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px]  " +
              signin.signInBtn
            }
            onClick={SignupSubmit}
          >
            Submit
          </button>
<GoogleSignInBtn click={googleSignin} />
        </div>
        <p className="text-center mt-3 text-sm line-break">
          Already have an account?{" "}
          <Link className=" underline text-[#edc211]" href={"/auth/signin"}>
            <span className="">Sign in</span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
