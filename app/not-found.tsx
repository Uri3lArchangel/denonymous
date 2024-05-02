'use client'
import Link from 'next/link'
import std from '@/public/styles/standardPages.module.css'
 
export default function NotFound() {
  return (
    <div className={std.notFound+" "}>
      <h2 className='text-[22px] mb-4 text-center w-full font-bold'>This page was not found</h2>
      {/* <p>Could not find requested resource</p> */}
      <div className='flex flex-wrap justify-center  h-[23%] w-[95%] mx-auto'>
      <button onClick={()=>{
        window.history.back()
      }} className={std.prevBtn}>Go to previous page</button>
      <Link href="/" className={std.homeBtn}>Go to homepage</Link>
</div>
    </div>
  )
}