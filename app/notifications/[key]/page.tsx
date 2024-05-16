import { fetchNotficationsServer } from '@/src/BE/functions'
import { updateNotificationAction } from '@/src/BE/serverActions/notificationsActions'
import Backarrow from '@/src/FE/components/subcomponents/Backarrow'
import { Metadata } from 'next'
import {  revalidateTag } from 'next/cache'
import Link from 'next/link'
import React from 'react'

export const metadata:Metadata = {
  title: 'Notification Message | Denonymous',
  description:"Receive real-time updates on Denonymous responses here. Unauthenticated users can receive notifications for text, image, video, and audio responses. Authenticated users, as creators of the Denonymous, can monitor all responses but cannot respond from this page. Other authenticated users can both receive and view responses if enabled by the author",
  keywords:[
    "Denonymous",
    "anonymous messaging app",
    "notification center",
    "text responses",
    "image responses",
    "video responses",
    "audio responses",
    "real-time updates",
    "authenticated users",
    "unauthenticated users",
    "response monitoring"
],
  robots:{
    index:false,
    follow:false
  },
 
}


async function page({params}:{params:{key:number}}) {
    const {key}=params
    const nots = await fetchNotficationsServer()
    const current = nots[key]
   await updateNotificationAction(key,current.owner)
 revalidateTag("notifications_fetch_tag")


  return (
    
    <section className=' bg-[#7a7a7a] h-[100vh] px-8 py-40 '>
      <article className='max-w-[600px] mx-auto text-white bg-black shadow-hd p-6 rounded-md'>
      <Backarrow  />
        <h1 className='text-2xl sm:text-3xl my-4'>{current.category}</h1>
        <p>{current.data}</p>
        <time className='text-gray-300 mt-6 block' dateTime={new Date(current.date).toString()}>{new Date(current.date).toDateString()}</time>
        <Link href={current.link?current.link:""} className={` text-black  w-full text-center sm:w-fit gradient_elements_div px-6 py-2 rounded-md ${current.link?"block":"hidden"} mt-4`} >view</Link>
        </article>
    </section>
  )
}

export default page