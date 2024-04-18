'use client'
import { verifyEmailAction } from '@/src/BE/serverActions/settingsactions';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';



const SixDigitInputField = () => {
// states
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
  const [pending,setPending]=useState(false)
  const [state,set]=useState({message:"",type:""})

// router
  const router = useRouter()

// contexts
  const notification = useContext(NotificationContext)!

// refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));


  // functions
  const handleInputChange = (index: number, value: string) => {
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

  useEffect(()=>{
    if(state.type){
      console.log(state)
    notification({type:state.type as any,message:state.message,description:""})
    if(state.type == "success"){
      router.push("/")
    }
    }
    
    return()=>{
      set({message:"",type:""})
    }
  },[])

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    setPending(true)
    const fullNumber = inputs.join('');
    set(await verifyEmailAction(fullNumber))
    setPending(false)  
    window.location.href="/dashboard"
  };

  return (
    <>
    <div className='flex flex-wrap sm:flex-nowrap space-x-2 justify-center w-full'>
      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          className=' border my-2 text-white border-[#A9A9A9] outline-none bg-transparent rounded-md block'
          maxLength={1}
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
          onPaste={handleInputPaste}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          style={{
            width: '40px',
            height: '40px',
            marginRight: '5px',
            textAlign: 'center',
            fontSize: '20px',
          }}
        />
      ))}
    </div>
    <button  className='gradient_elements_div px-6 py-2 block rounded-md' onClick={handleSubmit} disabled={pending}>{pending?"Submitting...":"Submit"}</button>
    </>
  );
};

export default SixDigitInputField;
