'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import DE from '../../../public/images/DP.png'
import EditableInput from './subcomponents/EditableInput'
import { NotificationContext } from './contexts/NotificationContext'
import { changeEmailAction, changePasswordAction } from '@/src/BE/serverActions/settingsactions'
import PasswordInput from './subcomponents/PasswordInput'
import PasswordAndConfirm from './subcomponents/PasswordAndConfirm'
import dynamic from 'next/dynamic'
import { EdgeStoreProvider } from '@/src/core/lib/edgestore'
let DeleteAccountModal:any=null;


const SettingsComponent = ({username,email,verified}:{username:string,email:string,verified:boolean}) => {
    const notification = useContext(NotificationContext)!
    const [pendingEmail,setPendingEmail]=useState(false)
    const [emailValue,setEmailValue]=useState("")
    const [hasAnyInputChangedEmail,setInputChangeTriggerEmail]=useState(false)
    const [emailState,setEmailState]=useState({message:"",type:""})
    const currentPasswordRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null)
    const [strength,setStrength]=useState(0)
    const [passwordState,setPasswordState]=useState({type:"",message:""})
    const [pendingPass,setPendingPass]=useState(false)
    const [deleteModalState,setDeleteModalState]=useState(false)

    const getEmailInputElement = ()=>{
        const element = document.getElementById("email-input") as HTMLInputElement
        setEmailValue(element.value)
        return element.value
    }
 
 

    const saveEmail = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        const emailError=document.getElementById("email-error") as HTMLParagraphElement
        emailError.innerText=""
        const form = new FormData()

        if(email != getEmailInputElement()){
        setPendingEmail(true)

            if(getEmailInputElement() == ''){
                emailError.innerText="email cannot be empty"
                emailError.style.color="red"
                setPendingEmail(false)
                return
            }
            
            form.append("email",email)
            form.append("newEmail",getEmailInputElement())
            setEmailState(await changeEmailAction(form))
            setPendingEmail(false)
           
            
        }

    }
  
    const changePassword = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        const dispaly = document.getElementById("pass_display") as HTMLParagraphElement
        dispaly.innerText =""
        if(!currentPasswordRef || ! newPasswordRef || !confirmNewPasswordRef || !currentPasswordRef .current|| ! newPasswordRef.current || !confirmNewPasswordRef.current)return
        if(strength < 3)return
        if(newPasswordRef.current.value != confirmNewPasswordRef.current.value)return
        if(currentPasswordRef.current?.value == newPasswordRef.current.value){
            dispaly.innerText="New password cannot be the same as old one"
            dispaly.style.color="red"
            return
        }
        setPendingPass(true)
        const fd  = new FormData()
        fd.append("current-password",currentPasswordRef.current.value)
        fd.append("new-password",newPasswordRef.current.value)

          setPasswordState(await changePasswordAction(fd))
        setPendingPass(false)

    }




    useEffect(()=>{
        getEmailInputElement()
      
        if(emailState.type){
            notification({type:emailState.type as any,message:emailState.message,description:''})
            if(emailState.type == "success"){
                setInputChangeTriggerEmail(false)
            }
        }
        if(passwordState.type){
            notification({type:passwordState.type as any,message:passwordState.message,description:''})
           if(passwordState.type == "success"){
            (document.getElementById("password-current")as HTMLInputElement).value = "";
            (document.getElementById("password")as HTMLInputElement).value = "";
            (document.getElementById("confirmPassword")as HTMLInputElement).value = "";
            ( document.getElementById("pass_display") as HTMLParagraphElement).innerText=""


           }
        }

    },[emailState.type,passwordState.type,emailState.message,notification,passwordState.message])
  return (
<section className='bg-black py-8 pt-6 backgroundVector'>
   {DeleteAccountModal && (<EdgeStoreProvider><DeleteAccountModal state={deleteModalState} setState={setDeleteModalState}/></EdgeStoreProvider>)}
    <h1 className='text-white font-bold text-xl text-center my-8'>Settings</h1>
    <div className='bg-[#1E1E1E] flex flex-col items-center space-y-4  py-10 max-w-[600px] mx-auto sm:mx-auto sm:px-6 rounded-md'>
        <figure className="w-[60px] h-[60px] mx-auto my-8">
        <Image loading='lazy' fetchPriority='low' src={DE} alt='DE' className="w-full h-full object-cover rounded-full" />
        </figure>
        {/* <form   className='text-white px-4 bg-[#262626] rounded-md p-2 space-y-4'>
                
            <label htmlFor="uname-input" className='text-sm'>Username</label>
           <EditableInput inputvalue={username} setInputChangeTrigger={setInputChangeTrigger}  input={{id:"uname-input",defaultValue:username,readOnly:true}} />
           <p id="username-error"></p>
           <button onClick={saveUname} className='gradient_elements_div px-4 py-2 rounded-md text-black my-4'  hidden={!hasAnyInputChanged} disabled={pendingUname}>{pendingUname?"Saving...":"Save"}</button>

           </form> */}
           <form  className='text-white px-4 bg-[#262626] rounded-md py-10 space-y-4 w-full'>
           <label htmlFor="email-input" className='text-md block text-center'>Email Address</label>
           <EditableInput inputvalue={email} input={{id:"email-input",defaultValue:email,readOnly:true}} setInputChangeTrigger={setInputChangeTriggerEmail}  />
           <small className='block text-right my-1 gradient_elements_text'>{(emailValue == email && verified)?"verified":"unverified"}</small>
           <p aria-live="assertive" id="email-error"></p>
           <button onClick={saveEmail} className='gradient_elements_div px-4 py-2 rounded-md text-black my-4'  hidden={!hasAnyInputChangedEmail} disabled={pendingEmail}>{pendingEmail?"Saving...":"Save"}</button>
           </form>
        <form className='text-white px-4 bg-[#262626] rounded-md py-10 w-full'>
            <h2 className='text-center text-md'>Change Password</h2>
            <hr className='my-4 opacity-[0.8] mb-2'/>
                <label htmlFor="password-current">Current password *</label>
                <PasswordInput passwordRef={currentPasswordRef} />
                <PasswordAndConfirm  strength={strength} setStrength={setStrength} passwordRef={newPasswordRef} confirmPasswordRef={confirmNewPasswordRef} />
            <button onClick={changePassword} disabled={pendingPass} className='gradient_elements_div px-4 py-4 rounded-md text-black my-4 block mx-auto'>{pendingPass?"Changing....":"Change Password"}</button>
        </form>
        <div className='text-white  w-full py-2'>
            <div className='border border-red-500 bg-[#262626] py-6 rounded-md  w-full'>
            <h2 className='text-xl font-extrabold text-center'>Danger zone!</h2>
            <button className='mx-auto block  bg-red-500 px-4 py-2 rounded-md text-black my-4' onClick={()=>{
                DeleteAccountModal = dynamic(()=>import('./libraries/Modals/DeleteAccountModal'))
                setDeleteModalState(true)
            }}>Delete Your Account</button>
            </div>
        </div>
        
    </div>
</section>  )
}

export default SettingsComponent