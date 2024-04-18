'use client'
import React, { useContext, useEffect } from 'react'
import SubmitButtonComponent from '@/src/FE/components/subcomponents/SubmitButtonComponent';
import { useFormState } from 'react-dom';
import { createDenonyous } from "@/src/BE/serverActions/actions";
import { NotificationContext } from '@/src/FE/components/contexts/NotificationContext';


const initialState= {
  message:"",type:"",reason:""
}

function CreateDenonymousForm({handleModalClose}:{handleModalClose:any}) {

  const notification = useContext(NotificationContext)!
  const [state,formAction]=useFormState(createDenonyous,initialState)

    useEffect(()=>{
      if(state.type == "success"){
        notification({type:state.type as any,message:state.message,description:""})
        handleModalClose()
      }
    },[state.type,handleModalClose,notification,state.message])


  return (
    <form action= {formAction} id='createDenonymousForm'>
    <input
      placeholder="Enter denonymous title"
      name="topic"
      className="border-2 text-white border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
    />
    <p className='text-red-500 text-md'>{state.type == 'warning' && state.reason == 'description'?state.message:null}</p>
    <textarea
      name="description"
      id=""
      cols={30}
      className="border-2 block border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none text-white/90 placeholder-[#404040] placeholder:text-sm"
      rows={10}
      placeholder="Description(Optional)"
    ></textarea>
    <p className='text-red-500 text-md'>{state.type == 'warning' && state.reason == 'description'?state.message:null}</p>

  <SubmitButtonComponent/>
    </form>
  )
}

export default CreateDenonymousForm