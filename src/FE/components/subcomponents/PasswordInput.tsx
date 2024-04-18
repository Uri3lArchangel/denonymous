'use client'
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react'

function PasswordInput({passwordRef,password,handleChange}:{passwordRef?:React.LegacyRef<HTMLInputElement>,password?:string,handleChange?:React.ChangeEventHandler<HTMLInputElement> }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
      };
  return (
    <div className="flex border-b-2 border-[#B58419] mt-4">  
    <input
      ref={passwordRef}
      type={showPassword ? 'text' : 'password'}
      name="password-current"
      required
      id="password-current"
    //   value={password}
      onChange={handleChange}
      placeholder="Enter password"
      className=" w-full mb-2  bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none"
    />
  {showPassword ?  <EyeOffIcon className="cursor-pointer" onClick={togglePasswordVisibility} /> :  <EyeIcon className="cursor-pointer" onClick={togglePasswordVisibility} />}
</div>  )
}

export default PasswordInput