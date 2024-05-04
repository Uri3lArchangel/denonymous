'use client'
import { calculateStrength } from '@/src/core/lib/helpers';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { SetStateAction, useState } from 'react'

function PasswordAndConfirm({passwordRef,confirmPasswordRef,strength,setStrength}:{passwordRef:React.RefObject<HTMLInputElement>,confirmPasswordRef:React.RefObject<HTMLInputElement>,strength:number,setStrength:React.Dispatch<SetStateAction<number>>}) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
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

  return (
<>
<div className='my-4'>
        <label htmlFor="password" className="block text-sm mb-2">
         New Password *
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
      <p id="pass_display"></p>
    </div>
    <div className='my-4'>
          <label htmlFor="confirmPassword" className="block text-sm mb-3">
            Confirm New Password *
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
        <p id="password_display"></p>

        </div>
</>  )
}

export default PasswordAndConfirm