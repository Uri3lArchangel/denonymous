import { fetchNotficationsServer } from '@/src/BE/functions'
import NotificationDetailLink from '@/src/FE/components/subcomponents/NotificationDetailLink'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import React from 'react'


export const metadata:Metadata = {
  title: 'Acme',
  robots:{
    index:false,
    follow:false
  },
 
}

async function page() {

  const nots = await fetchNotficationsServer()
  const newNots = nots.reverse()
  let length = newNots.length
  const flipIndex = (b:number)=>{
    const newIndex = Array.from({length},(_,i)=>(length-(i+1)))
    return newIndex[b]
  }
revalidatePath("/notifications")
  return (
<section className='bg-black backgroundVector py-10 h-[100vh] overflow-y-scroll '>
  <h1 className='my-6 text-white text-2xl sm:text-3xl text-center'>Notifications({nots.length})</h1>
  <div className='w-[90%] rounded-md max-w-[400px] mx-auto'>
      {newNots.map((e,i)=>(
        <div className='w-full ' key={i}>
     <NotificationDetailLink i={flipIndex(i)} e={e} />
          </div>
      ))
      }
      </div>
</section>  

)
}

export default page