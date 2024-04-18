'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import DE from '../../../public/images/DP.png'
import EditableInput from './subcomponents/EditableInput'
import { NotificationContext } from './contexts/NotificationContext'
import { validateEmail } from '@/src/core/lib/helpers'
import VerifyEmailModal from './libraries/Modals/VerifyEmailModal'
import { changeEmailAction, changePasswordAction, changeUsernameAction } from '@/src/BE/serverActions/settingsactions'
import PasswordInput from './subcomponents/PasswordInput'
import PasswordAndConfirm from './subcomponents/PasswordAndConfirm'
import DeleteAccountModal from './libraries/Modals/DeleteAccountModal'



const SettingsComponent = ({username,email,verified}:{username:string,email:string,verified:boolean}) => {
    const notification = useContext(NotificationContext)!
    const [pendingUname,setPendingUname]=useState(false)
    const [pendingEmail,setPendingEmail]=useState(false)
    const [emailValue,setEmailValue]=useState("")
    const [verifyEmailModalState,setVerifyEmailModalState] = useState(false)
    const [hasAnyInputChanged,setInputChangeTrigger]=useState(false)
    const [hasAnyInputChangedEmail,setInputChangeTriggerEmail]=useState(false)
    const [unameState,setUnameState]=useState({message:"",type:""})
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
    const getUsernameInputElement = ()=>{
        const element = document.getElementById("uname-input") as HTMLInputElement
        return element.value
    }

    const saveUname =async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        const unameError=document.getElementById("username-error") as HTMLParagraphElement
        unameError.innerText=""
            
            const form = new FormData()
            if(username != getUsernameInputElement()){
                setPendingUname(true)
                form.append("uname-input",getUsernameInputElement())
                form.append("uname",username)

               setUnameState(await changeUsernameAction(form))
            setPendingUname(false)
                
            
            }
        
     

        
   
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
        getUsernameInputElement()
        if(unameState.type){
            notification({type:unameState.type as any,message:unameState.message,description:''})
            if(unameState.type == "success"){
                setInputChangeTrigger(false)
            }
        }
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

    },[unameState.type,emailState.type,passwordState.type,emailState.message,notification,passwordState.message,unameState.message])
  return (
<section className='bg-black py-8 pt-6 backgroundVector'>
    <DeleteAccountModal state={deleteModalState} setState={setDeleteModalState}/>
    <h1 className='text-white font-bold text-xl text-center my-8'>Settings</h1>
    <div className='bg-[#1E1E1E] flex flex-col items-center py-10 max-w-[400px] sm:mx-auto sm:px-6 rounded-md'>
        <Image src={DE} alt='DE' className='w-[60px] h-[60px]  my-8' />
        <form   className='text-white px-4 bg-[#262626] rounded-md p-2 space-y-4'>
                
            <label htmlFor="uname-input" className='text-sm'>Username</label>
           <EditableInput inputvalue={username} setInputChangeTrigger={setInputChangeTrigger}  input={{id:"uname-input",defaultValue:username,readOnly:true}} />
           <p id="username-error"></p>
           <button onClick={saveUname} className='gradient_elements_div px-4 py-2 rounded-md text-black my-4'  hidden={!hasAnyInputChanged} disabled={pendingUname}>{pendingUname?"Saving...":"Save"}</button>

           </form>
           <form  className='text-white px-4 bg-[#262626] rounded-md p-2 space-y-4'>
           <label htmlFor="email-input" className='text-sm '>Email Address</label>
           <EditableInput inputvalue={email} input={{id:"email-input",defaultValue:email,readOnly:true}} setInputChangeTrigger={setInputChangeTriggerEmail}  />
           <small className='block text-right my-1 gradient_elements_text'>{(emailValue == email && verified)?"verified":"unverified"}</small>
           <p id="email-error"></p>
           <button onClick={saveEmail} className='gradient_elements_div px-4 py-2 rounded-md text-black my-4'  hidden={!hasAnyInputChangedEmail} disabled={pendingEmail}>{pendingEmail?"Saving...":"Save"}</button>
           </form>
        <form className='text-white px-4 bg-[#262626] rounded-md p-2'>
            <h2 className='text-center'>Change Password</h2>
            <hr className='my-2 opacity-[0.8]'/>
                <label htmlFor="password-current">Current password *</label>
                <PasswordInput passwordRef={currentPasswordRef} />
                <PasswordAndConfirm  strength={strength} setStrength={setStrength} passwordRef={newPasswordRef} confirmPasswordRef={confirmNewPasswordRef} />
            <button onClick={changePassword} disabled={pendingPass} className='gradient_elements_div px-4 py-2 rounded-md text-black my-4'>{pendingPass?"Changing....":"Change Password"}</button>
        </form>
        <div className='text-white px-4 w-full '>
            <div className='border border-red-500 bg-[#262626] p-2 rounded-md  w-full'>
            <h2 className='text-xl font-extrabold text-center'>Danger zone!</h2>
            <button className='mx-auto block  bg-red-500 px-4 py-2 rounded-md text-black my-4' onClick={()=>{
                setDeleteModalState(true)
            }}>Delete Your Account</button>
            </div>
        </div>
        
    </div>
</section>  )
}

export default SettingsComponent