import Image from 'next/image'
import React from 'react'
import d from  '@/public/images/dashboard.png'

function ResponsesSVG() {
  return (
   <Image src={d} alt='' className='w-full block' /> )
}

export default ResponsesSVG