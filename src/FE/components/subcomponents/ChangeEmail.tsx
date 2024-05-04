'use client'
import { changeEmailActionWithoutRediirect } from '@/src/BE/serverActions/settingsactions'
import { validateEmail } from '@/src/core/lib/helpers'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'


const initialState = {
    type:"",message:""
}
const ChangeEmail = ({email}:{email:string}) => {
    const [pending,setPending]=useState(false)
    const notification = useContext(NotificationContext)!
    const [state,set]=useState({message:"",type:""})
    const emailRef=useRef<HTMLInputElement>(null)

useEffect(()=>{
    if(state.type){
    notification({type:state.type as any,message:state.message,description:''})
    }

},[state.type,pending,notification,state.message])


    const saveEmail = async(e:React.MouseEvent<HTMLButtonElement>)=>{
 e.preventDefault()
        if(!emailRef || !emailRef.current)return
        const emailError=document.getElementById("email-error") as HTMLParagraphElement
        emailError.innerText=""
        emailError.innerText=""
        const form = new FormData()
        const newEmail = emailRef.current.value
        if(email != newEmail){
        setPending(true)

          const {status}= validateEmail(newEmail)
          if(status != "success"){
            emailError.innerText="Invalid email address"
            emailError.style.color="red"
            return
          }
            
            form.append("email",email)
            form.append("newEmail",newEmail)
            set(await changeEmailActionWithoutRediirect(form))

            setPending(false)
            }



    }
  return (
    <form  className='text-white'>
 <div>
        <label htmlFor="email" className="block text-md sm:text-xl mb-5  text-center ">
          Change Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          ref={emailRef}
          placeholder="Enter New Email Address"
          className=" border-b-2 border-[#B58419] max-w-[300px] mx-auto block w-full mb-7 bg-transparent placeholder:text-[#c9c1c1c9] focus:outline-none text-white/80" 
        />

      </div>
<p id="email-error"></p>    
<button onClick={saveEmail} id='' className='w-full sm:w-fit gradient_elements_div sm:px-6 py-2 rounded-md text-black block mx-auto' disabled={pending}>{pending?"Please Wait":"Change"}</button>
</form>
    )
}

export default ChangeEmail