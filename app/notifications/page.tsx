import { fetchNotficationsServer } from '@/src/BE/functions'
import NotificationDetailLink from '@/src/FE/components/subcomponents/NotificationDetailLink'
import {  notificationDataTraucate } from '@/src/core/lib/helpers'
import { LucideMessageSquareText, MessageCircleXIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { RiNotification2Line, RiNotification4Fill, RiNotificationBadgeFill } from 'react-icons/ri'

async function page() {

  const nots = await fetchNotficationsServer()
  return (
<section className='bg-black backgroundVector py-10 h-[100vh] overflow-y-scroll '>
  <h1 className='my-6 text-white text-2xl sm:text-3xl text-center'>Notifications({nots.length})</h1>
  <div className='w-[90%] rounded-md max-w-[400px] mx-auto'>
      {nots.map((e,i)=>(
        <div className='w-full ' key={i}>
     <NotificationDetailLink i={i} e={e} />
          </div>
      ))
      }
      </div>
</section>  

)
}

export default page