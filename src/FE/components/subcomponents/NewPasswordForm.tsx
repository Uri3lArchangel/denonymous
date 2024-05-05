'use client'
import { changePasswordAction } from '@/src/BE/serverActions/authactions';
import { calculateStrength } from '@/src/core/lib/helpers';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useContext, useRef, useState } from 'react'
import { NotificationContext } from '../contexts/NotificationContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import logo from "@/public/images/logo.avif";
import Image from 'next/image';

const NewPasswordForm = ({token}:{token:string}) => {
    //  states
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
  const [pending,setPending]=useState(false)

//router
const router = useRouter()

/**
 * Calculates the strength of each feature of the password
 * @param {string} pass 
 * @returns {number} score 
 */




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

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const notification = useContext(NotificationContext)!
    
  const passwordChangeFunction = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    
    if(!passwordRef.current || !confirmPasswordRef.current){
    
      return 
    }
    const p = document.getElementById("pass_display") as HTMLParagraphElement;
    p.innerText=""
    if(!passwordRef.current.value){
      p.innerText="Please provide a password"
      p.style.color="red"
      return
    }
    p.innerText=""
    if(strength <3){
      return
    }
    if(passwordRef.current.value != confirmPasswordRef.current.value){
      return
    }
 setPending(true)
   const stat = await changePasswordAction(token,passwordRef.current.value)
   setPending(false)
   if(stat != "success"){
    router.push("/auth/reset-password")
    notification({
      message:"An error occured",
      type:"error",
      description:""
     })
   }
   notification({
    message:"Password changed successfully",
    type:"success",
    description:""
   })
   router.push("/auth/signin")
   
  }

  return (
    <form  className=' bg-black text-white  transform shadow-hd rounded-md px-10 w-[95%] max-w-[400px] mx-auto py-20'>
        
        <h1 className='mb-4 text-center'>Create a new password</h1>
        <hr />
        <div className='mt-8'>
        <label htmlFor="confirmPassword" className="block text-sm mb-3">
         Password *
          </label>
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
            className=" w-full mb-2  bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
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
    <p id="pass_display" className='mb-4'></p>

    <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-3">
            Confirm Password *
          </label>
          <div className="flex border-b-2 border-[#B58419] mb-2">  

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
        <p id="password_display" className='mb-4'></p>

        <button 
    onClick={
      passwordChangeFunction
      
    }
    
    className='gradient_elements_div w-full px-6 rounded-md block text-black py-4' disabled={pending}>{pending?"Submitting...":"Submit"}</button>     </form>
  
  )
}

export default NewPasswordForm