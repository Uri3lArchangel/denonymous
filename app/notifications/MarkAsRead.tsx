'use client'
import { markAllAsReadAction } from '@/src/BE/serverActions/notificationsActions'
import React, { useState } from 'react'
import spinner from '@/public/images/spinner.gif'
import Image from 'next/image'

function MarkAsRead() {
    const [loading,setLoading]=useState(false)
    const markAllARead = async()=>{
      setLoading(true)
     await markAllAsReadAction()
     setLoading(false)
    }
  return (
    <section className=" w-[90%] max-w-[600px] text-right mx-auto my-4">
    <button id="markAllAsRead" onClick={markAllARead} disabled={loading} aria-disabled={loading} className="underline flex items-center justify-end w-full text-[#f2d204]">
      
      {loading?<Image src={spinner} alt="spinner" className="w-[1.15rem]" />:<></>}
      Mark all as read</button>
  </section>  )
}

export default MarkAsRead