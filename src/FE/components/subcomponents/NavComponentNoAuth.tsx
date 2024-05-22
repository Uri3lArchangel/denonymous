'use client'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import logo from '@/public/images/logo.avif'
import Link from 'next/link'
import { DropdownApp, TooltipApp } from '../libraries/antd'
import { AuthDropdown, NavCollapsedMenu, ProfileDropdown, navPages } from '@/src/core/data/DropdownNavProfileItems'
import Image from 'next/image'
import { CiMenuBurger } from 'react-icons/ci'
import { usePathname } from 'next/navigation'


function NavComponentNoAuth() {

  const [activeLink, setActiveLink] = useState<string>(''); // State to manage active link

  const path = usePathname()
  useEffect(() => {
    setActiveLink(path);
  }, [path]);


//  const isActiveLink = () => {
//    const currentPath = window.location.pathname;
//    setActiveLink(currentPath);
//  };

  return (
    <nav className={' sticky top-0 bg-black py-4 w-full z-[6]'}>
    <ul className='flex items-center  justify-between sm:w-[70%] w-[90%]  mx-auto'>
        <li className='flex items-end  justify-between '>
          <Link href="/"> 
  <Image fetchPriority='high' className=' w-[150px]' src={logo} alt="logo"  loading='eager'/>
  </Link>
        </li>



<>
<li className='hidden lg:flex text-white navlinks text-sm'>
<Link href="/" className={`mx-2 lg:mx-4 ${activeLink === '/' ? 'gradient_elements_text' : ''} `} id='home_link'>Home</Link>
<Link href="/dashboard"  className={`mx-2 lg:mx-4 ${activeLink.includes('dashboard') ? 'gradient_elements_text' : ''}`} id='dashboard_link'>Dashboard</Link>
<TooltipApp text='' title='Premium feature coming soon!'>
<Link aria-disabled href="" className='mx-2 lg:mx-4 cursor-not-allowed opacity-[0.7]'>Premium</Link>
</TooltipApp>

</li>
<li className='hidden sm:flex lg:hidden'>
<DropdownApp 
rootClassName={"navDropdown"}
trigger={['click']}
items={navPages}
triggerComponent={
<CiMenuBurger size={30} className=" font-extrabold text-[#ffdf00] block  cursor-pointer" /> 
}

/>
</li>
<li className='flex' >
<DropdownApp 
rootClassName={"navDropdown"}
trigger={['click']}
items={AuthDropdown}
triggerComponent={
<CiMenuBurger size={30} className=" font-extrabold text-[#ffdf00] block sm:hidden cursor-pointer" /> 
}

/>

<Link href="/auth/signin" className='gradient_elements_text border border-[#ffdf00] mr-2 px-6 py-2 rounded-md hidden sm:block'>Sign in</Link>
<Link href="/auth/signup" className='gradient_elements_div px-6 py-2 text-black rounded-md hidden ml-2 sm:block'>Sign up</Link>
</li>
</>
     


    </ul>
</nav>  )
}

export default NavComponentNoAuth