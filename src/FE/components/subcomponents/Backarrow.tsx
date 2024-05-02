'use client'
import { ChevronsLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Backarrow() {
    const router = useRouter()
  return (
    <ChevronsLeftIcon className="text-black gradient_elements_div p-1 rounded-full cursor-pointer" onClick={
        ()=>{
           router.push("/notifications")
        }
    } size={32}/>
    )
}

export default Backarrow