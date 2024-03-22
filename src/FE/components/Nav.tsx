import React, { ReactNode } from 'react'
import nav from '../../../styles/nav.module.css'
import logo from '../../../public/images/logo.png'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import BellIconSVG from './assets/BellIconSVG'
import { AiFillProfile } from 'react-icons/ai'
import { BsBellFill, BsPersonCircle, BsPersonFill, BsPersonFillCheck } from 'react-icons/bs'
import { DropdownApp } from './libraries/antd'
import { AuthDropdown, NavCollapsedMenu, ProfileDropdown } from '@/src/core/data/DropdownNavProfileItems'
import { BellIcon } from 'lucide-react'
import Image from 'next/image'
import { CiMenuBurger } from 'react-icons/ci'

const Nav = () => {
    let authenticated = false
    const cookie = cookies().get("denon_session_0")
    if(cookie){
       let res=  verifyUserDataToken(cookie.value)
       if(res) authenticated=true
    }
  return (
    <nav className={nav.NavBar+' sticky top-0 bg-black py-4 w-full z-[10]'}>
        <ul className='flex items-end justify-between sm:w-[70%] w-[90%]  mx-auto'>
            <li className='flex items-end md:flex-[8] flex-[3] '>
              <Link href="/"> 
      <Image  className='blaock w-[150px]' src={logo} alt="logo" />
      </Link>
            </li>
{authenticated?


<li className=' items-center flex-[1] justify-between flex'>
  <div className='notificationBellContainer relative text-[#D4D4D4] cursor-pointer hover:text-[#ffdf00]   '>
    <p className='gradient_elements_div absolute left-[50%] min-w-[20px] h-[20px] px-1 rounded-full text-center text-black'>99+</p>
    <DropdownApp triggerComponent={
      <BsBellFill size={35} />

    }items={
      ['hell','bee','well','tll'].map((e,i)=>(
      {
        key: `${i}`,
        
        label: (
     <div className='flex '> <p className='w-[100%] md:min-w-[400px] text-xl mr-10'>{e}</p><button className='ml-10'>view</button></div>
        ),
      }))
    
    
    }
 
    trigger={['click']}
    />
</div>
<DropdownApp triggerComponent={ 
<BsPersonCircle size={35} className=" text-[#D4D4D4] cursor-pointer" /> 

} items={ProfileDropdown}/>

</li>
:<li className='flex'>
  <DropdownApp 
  trigger={['click']}
  items={AuthDropdown}
  triggerComponent={
 <CiMenuBurger size={30} className=" font-extrabold text-[#ffdf00] block sm:hidden cursor-pointer" /> 
  }

  />

 <Link href="/auth/signin" className='gradient_elements_text border border-[#ffdf00] mr-2 px-6 py-2 rounded-md hidden sm:block'>Sign in</Link>
 <Link href="/auth/signup" className='gradient_elements_div px-6 py-2 rounded-md hidden ml-2 sm:block'>Sign up</Link>
  </li>
}          


        </ul>
    </nav>
  )
}

export default Nav