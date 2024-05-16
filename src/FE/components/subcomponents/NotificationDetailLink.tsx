
'use client'
import { LucideMessageSquareText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function NotificationDetailLink({i,e,length}:{i:any,e:any,length:number}) {
const router = useRouter()
  return (
    <button onClick={
      ()=>{
       router.push(`/notifications/${i}`)
     
      }
    }  key={i} id={(i==length-1)?'note_btn_first':(i==0)?'note_btn_last':""} className={`text-white/90 w-full ${e.opened?"bg-[#1e1e1e]  ":"bg-[#646464]"} text-left hover:opacity-[0.9] px-6 py-8 block `}>
      
    <LucideMessageSquareText size={15}/>
    <h1 className='text-xl font-semibold'>{e.category}</h1>
<p className="notificationData">{e.data}</p>  
<small className='text-gray-200 mt-4'>{new Date(e.date).toDateString()}</small>

  </button>  )
}

export default NotificationDetailLink