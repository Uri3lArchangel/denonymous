'use client'
import React, {  useEffect,  useState } from 'react'
import logo from '@/public/images/logo.avif'
import Link from 'next/link'
import { BsBellFill, BsPersonCircle} from 'react-icons/bs'
import { DropdownApp, TooltipApp } from '../libraries/antd'
import {  ProfileDropdown, navPages } from '@/src/core/data/DropdownNavProfileItems'
import Image from 'next/image'
import { CiMenuBurger } from 'react-icons/ci'
import { userNotificationType } from '@/types'
import {  largeNumbersTrauncate } from '@/src/core/lib/helpers'
import { usePathname } from 'next/navigation'

function NavComponentAuth({notifications}:{notifications:userNotificationType[]}) {
let a =(notifications.filter(e=>!e.opened)) 
 let unread=a.length
 const [activeLink, setActiveLink] = useState<string>(''); // State to manage active link
const path = usePathname()
  useEffect(() => {
    setActiveLink(path);
  }, [path,unread]);





  return (
    <nav className={' sticky top-0 bg-black py-4 w-full z-[6]'}>
    <ul className='flex items-center  justify-between sm:w-[70%] w-[90%]  mx-auto'>
        <li className='flex items-end  justify-between '>
          <Link href="/"> 
          <Image  className='w-[150px]' src={logo} alt="logo" fetchPriority='high' loading='eager' />
  </Link>
        </li>
    
<>
<li className='md:hidden ' >
<DropdownApp rootClassName={"navDropdown"} trigger={['click']} triggerComponent={<CiMenuBurger size={30} className="cursor-pointer text-white" />} items={navPages} />

</li>
<li className='hidden md:flex text-white navlinks text-sm'>
<Link href="/" className={`mx-2 lg:mx-4 ${activeLink === '/' ? 'gradient_elements_text' : ''}`} id='home_link'>Home</Link>
<Link href="/dashboard" className={`mx-2 lg:mx-4 ${activeLink.includes('dashboard') ? 'gradient_elements_text' : ''} `} id='dashboard_link'>Dashboard</Link>
<TooltipApp text='' title='Premium feature coming soon!'>
<Link aria-disabled href="" className='mx-2 lg:mx-4 cursor-not-allowed opacity-[0.7]'>Premium</Link>
</TooltipApp>

</li>
<li className=' items-center justify-between flex  '>



<div className='notificationBellContainer mr-4 md:mr-8 relative text-[#D4D4D4] cursor-pointer hover:text-[#ffdf00]   '>



<p className={`gradient_elements_div absolute left-[50%] min-w-[17px] h-[17px] text-sm px-1 rounded-full text-center text-black ${unread == 0?'hidden':'block'}`}>{unread == 0?"":largeNumbersTrauncate(unread)}</p>

<Link href="/notifications"><BsBellFill size={30} /></Link>

</div>
<DropdownApp rootClassName={"navDropdown"} triggerComponent={ 
<BsPersonCircle size={30} className=" text-[#D4D4D4] cursor-pointer" /> 

} items={ProfileDropdown}/>

</li>

</>


    </ul>
</nav>  )
}

export default NavComponentAuth