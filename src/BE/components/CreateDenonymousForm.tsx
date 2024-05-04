'use client'
import React, { Suspense, useContext, useRef, useState } from 'react'
import { createDenonyous } from "@/src/BE/serverActions/actions";
import { NotificationContext } from '@/src/FE/components/contexts/NotificationContext';
import styles from "@/public/styles/styles.module.css";


function CreateDenonymousForm({handleModalClose}:{handleModalClose:any}) {
  const [pending,setPending]=useState(false)
  const notification = useContext(NotificationContext)!
  const topicRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)


const createDenonymousFunction=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  const topicError = (document.getElementById("topic_error") as HTMLParagraphElement);
  const descError = (document.getElementById("desc_error") as HTMLParagraphElement);

  if(!topicRef || !topicRef.current || !descRef || !descRef.current)return
  const topic =topicRef.current.value;
  const desc = descRef.current.value;
  if(!topic) {topicError.innerText="Topic cannot be empty";return}
  if(topic.length > 50) {topicError.innerText = "Topic max length exceeded";return}
  if(desc.length > 100) {descError.innerText = "Description max length exceeded";return}
  setPending(true)

  const res= await createDenonyous(topic,desc)
setPending(false)
  notification({
    type:res.type as any,message:res.message,description:""
  })
  if(res.type == "success"){
    handleModalClose()
  }
}

    

  return (
    <form id='createDenonymousForm'>
    <input
    ref={topicRef}
    maxLength={50}
      placeholder="Enter denonymous title"
      name="topic"
      className="border-2 text-white border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
    />
    <p className='text-red-500 text-md' id='topic_error'></p>

    <textarea
    ref={descRef}
      name="description"
      id=""
      cols={30}
      maxLength={100}
      className="border-2 block border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none text-white/90 placeholder-[#404040] placeholder:text-sm"
      rows={10}
      placeholder="Description(Optional)"
    ></textarea>
    <p className='text-red-500 text-md' id='desc_error'></p>

    <button
    className={
      "border-2  text-base text-black font-bold p-2 my-12 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] " +
      styles.signInBtn
    }
    onClick={createDenonymousFunction}
    aria-disabled={pending}
    disabled={pending}
    type="submit"
  >
    {pending?"Please wait...":"Create"}
  </button>     </form>
  )
}

export default CreateDenonymousForm