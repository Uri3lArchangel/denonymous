import React, { CSSProperties, SetStateAction, useContext, useEffect, useState } from 'react'
import { ModalComponent } from '../antd'
import { deleteAccountAction } from '@/src/BE/serverActions/settingsactions'
import { useSession } from '../../hooks/SessionHook'
import Loading from '@/app/loading'


const DeleteAccountModal = ({state,setState}:{state:boolean,setState:React.Dispatch<SetStateAction<boolean>>}) => {
const [clickable,setClickable]=useState(false)
const [pending,setPending]=useState(false)
const {setSession}=useSession()
const inputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  if((e.currentTarget.value).toLocaleLowerCase() == 'delete my account' ){
    setClickable(true)
  }else{
    setClickable(false)
  }
}
const deleteAcc = async()=>{
  setPending(true)
 await deleteAccountAction()
 setSession(false)
 setPending(false)

}

  return (
<ModalComponent setState={setState} state={state} title="Delete Account" styles={{content:{backgroundColor:"#171717",border:"1px solid #ffdf00",borderRadius:"10px"},header:{backgroundColor:"#171717"}}}>
{  pending?<Loading />:<></>}

<div className='px-8' >
<h1 className="text-center font-bold text-white text-lg ">Are you sure you want to delete your account?</h1>
<p className='text-neutral-300 text-center my-4 '>Write the statement: <span className='text-white select-text font-bold text-md'>&quot;delete my account&quot;</span> in the space below to delete your account. <span className=' text-red-500'> This action cannot be undone, and all denonyms linked to your account would be deleted</span> </p>
<input onChange={inputChange} maxLength={17} type="text" className='text-white w-full block border border-neutral-300 bg-transparent outline-none h-[35px] mx-auto sm:w-[70%] rounded-md px-2 ' />

<button disabled={!clickable || pending} onClick={deleteAcc} className='gradient_elements_div mx-auto block px-6 py-2 rounded-md my-6'>Delete account</button>
</div>
</ModalComponent>
    )
}

export default DeleteAccountModal