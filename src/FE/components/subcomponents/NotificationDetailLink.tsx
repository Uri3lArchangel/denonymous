
import { LucideMessageSquareText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotificationDetailLink({i,e}:{i:any,e:any}) {

  return (
    <Link href={`/notifications/${i}`}  key={i} className={`text-white/90 w-full ${e.opened?"bg-[#171C24]  ":"gradient_elements_div"} text-left bg-gray-700  px-6 py-8 transform hover:scale-[1.02] transition duration-[0.3s]    block border-b border-gray-400`}>
      
    <LucideMessageSquareText size={15}/>
    <h1 className='text-xl font-semibold'>{e.category}</h1>
<p className="notificationData">{e.data}</p>  
<small className='text-gray-200 mt-4'>{new Date(e.date).toDateString()}</small>

  </Link>  )
}

export default NotificationDetailLink