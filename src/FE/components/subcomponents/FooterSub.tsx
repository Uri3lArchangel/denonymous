'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/images/logo.avif'
import twitter from '@/public/images/twitter.avif'
import insta from'@/public/images/insta.avif'
import linkedin from  '@/public/images/linkedin.avif'
import medium from'@/public/images/medium.avif'
function FooterSub() {
  return (
    <footer className="min-h-[30vh] bg-black text-white pt-10 px-4">
    <div className=" mx-auto w-full max-w-[1024px]"  >
  <Image src={logo} alt="denonymous" className="mt-4 w-40" />
  <p className=' font-extralight my-4 text-sm sm:w-[60%]'>Denonymous: The No 1 platform for Sharing video, image, audio and text responses anonymously. Register with us, create a Denonymous, and share with others to receive responses on any topic today.</p>
  <Link href="/privacy" className='block text-white  underline' target='_blank'>Terms and Conditions</Link>
  <Link href="/privacy" className='block text-white  underline' target='_blank'>Privacy Policy</Link>
  <ul className="flex space-x-4 my-4">
    <li>
      <Link href="https://twitter.com/denonymous_">
      <Image fetchPriority="low" loading="lazy" src={twitter} alt="twitter"/>
      </Link>
    </li>
    <li>
    <Link href="https://www.instagram.com/denonymous_/">

      <Image fetchPriority="low" loading="lazy" src={insta} alt="instagram" />
      </Link>
    </li>
    <li>
    <Link href="https://www.linkedin.com/company/denonymous">

      <Image fetchPriority="low" loading="lazy" src={linkedin} alt="linkedin" />
      </Link>
    </li>
    <li>
    <Link href="https://denonymous.medium.com/">

      <Image fetchPriority="low" loading="lazy" src={medium} alt="medium" />
      </Link>
    </li>
  </ul>
    {/* <Link href="/support" className="block mx-auto  w-fit  underline">Support</Link> */}
    </div>
    <aside className="text-sm text-bold text-center mt-4 border-t py-2  mx-auto">All Rights Reserved. Copyright © 2024.</aside>

  </footer>    )
}

export default FooterSub