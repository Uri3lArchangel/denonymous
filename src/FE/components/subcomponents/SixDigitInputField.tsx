'use client'
import { verifyEmailAction } from '@/src/BE/serverActions/settingsactions';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import ResenVerificationCode from './ResenVerificationCode';



const SixDigitInputField = ({email}:{email:string}) => {
// states
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
  const [pending,setPending]=useState(false)
  // const [state,set]=useState({message:"",type:""})

// router
  const router = useRouter()

// contexts
  const notification = useContext(NotificationContext)!

// refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));


  // functions
  const handleInputChange = (index: number, value: string) => {
    if(isNaN(Number(value)))return
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputs[index] === '' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData?.getData('text');
    if (clipboardData) {
      const pastedValues = clipboardData.split('').filter((char) => !isNaN(Number(char)));
      const newInputs = [...inputs];
      let currentIndex = 0;
      for (const char of pastedValues) {
        if (currentIndex >= 6) break;
        newInputs[currentIndex] = char;
        currentIndex++;
      }
      setInputs(newInputs);
    }
  };



  // useEffect



  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    setPending(true)
    const fullNumber = inputs.join('');
    const res = await verifyEmailAction(fullNumber)
    setPending(false)  
    notification({type:res.type as any,message:res.message,description:''})
    if(res.type == "success"){router.push("/dashboard")}
  };

  return (
    <>
    <div className='flex space-x-2 justify-center w-full'>
      {inputs.map((value, index) => (
        <input
          key={index}
          type="number"
          className=' border my-2 text-white border-[#A9A9A9] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] sm:mx-[4px] mx-[2px] text-[20px] text-center outline-none bg-transparent rounded-md block'
          maxLength={1}
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
          onPaste={handleInputPaste}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          // style={{
          //   width: '40px',
          //   height: '40px',
          //   marginRight: '5px',
          //   textAlign: 'center',
          //   fontSize: '20px',
          // }}
        />
      ))}
    </div>

    <div className='flex flex-col mx-auto justify-between md:w-fit w-full items-center'>
    <button  className='gradient_elements_div  px-6 h-[40px] block rounded-md' onClick={handleSubmit} disabled={pending}>{pending?"PLease Wait...":"Verify"}</button>
    <ResenVerificationCode  email={email} /> 
  </div>

    </>
  );
};

export default SixDigitInputField;
