import { fetchNotficationsServer } from '@/src/BE/functions'
import { updateNotificationAction } from '@/src/BE/serverActions/notificationsActions'
import Backarrow from '@/src/FE/components/subcomponents/Backarrow'
import { revalidateTag } from 'next/cache'
import Link from 'next/link'
import React from 'react'



async function page({params}:{params:{key:number}}) {
    const {key}=params
    const nots = await fetchNotficationsServer()
    const current = nots[key]
    await updateNotificationAction(key,current.owner)
 revalidateTag("notifications_fetch_tag")

  return (
    
    <section className=' bg-[#8d8d8d] backgroundVector  px-8 py-20'>
      <div className='max-w-[500px] mx-auto text-white bg-black shadow-hd p-6 rounded-md'>
      <Backarrow  />
        <h1 className='text-2xl sm:text-3xl my-4'>{current.category}</h1>
        <p>{current.data}</p>
        <small className='text-gray-300 mt-6 block'>{new Date(current.date).toDateString()}</small>
        <Link href={current.link?current.link:""} className={` w-full sm:w-fit gradient_elements_div px-6 py-2 rounded-md ${current.link?"block":"hidden"} mt-4`} >view</Link>
        </div>
    </section>
  )
}

export default page