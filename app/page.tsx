import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import anon from '../public/images/anonymity.svg'
import sec from '../public/images/secure.svg'
import easy from '../public/images/easy.svg'



function page() {
  return (
    <>

    <section>
      <header className=' backgroundVector flex flex-col items-center bg-black min-h-[80vh] pt-14 px-4'>
        <div className='bg-[#FFFAE1]  w-fit rounded-md px-6 py-2 flex text-[13px] mb-6'>
          <p className='gradient_elements_text mx-1 '> Explore the world Of Secret! </p>🤫
         
        </div>
        <h1 className='text-[36px] font-extrabold text-white mb-20 text-center'>Exchange Online <br /> Secret Message </h1>
        <Link href="/dashboard" className='gradient_elements_div text-[16px] w-full py-4 block rounded-md text-center max-w-[200px] sm:px-6'>Dashboard</Link>
      </header>
      <main >
        <section className='text-center py-12 px-4 sm:w-[60%] mx-auto'>
          <h2 className='text-[22px] my-4 font-bold'>Why use Denonymous?</h2>
          <p className='text-sm text-[#19182566] font-extralight' >Denonymous: an anonymous messaging app where everyone (Auth and Un auth users), Below is the full breakdown of all the features per user.</p>
          <ul className='md:flex flex-wrap w-full justify-center'>
            <li className='border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px] mx-2'>
              <Image className='block mx-auto' src={anon} alt='anonymity' />
              <h2 className=' font-semibold my-4'>Anonymity</h2>
              <p className='text-[#19182566] font-extralight'>We prioritize your privacy. Our platform enables you to share messages anonymously without revealing your identity. Embrace the freedom to be yourself without the constraints of societal expectations.</p>
            </li>
            <li className='border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px] mx-2'>
              <Image className='block mx-auto' src={sec} alt='security' />
              <h2 className=' font-semibold my-4'>Safe & Secure</h2>
              <p className='text-[#19182566] font-extralight'>Your safety and security, we prioritizes with encryption, a secure platform, anonymous posting, dedicated moderation, and a report mechanism, fostering a trusted space for free expression.</p>
            </li>   
            <li className='border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px]'>
              <Image className='block mx-auto' src={easy} alt='security' />
              <h2 className=' font-semibold my-4'>Easy 2 Use</h2>
              <p className='text-[#19182566] font-extralight'>Join today and let your Unseen Voice echo loud and clear. Unwavering companion and your experience - it is your haven for honest, secure, and anonymous expression with Hopeful and uplifting words.</p>
            </li>          
          </ul>
        </section>
        <section className='mt-[8em]  text-center py-24 sm:w-[60%] mx-auto'> 
          <h2 className='mb-[5em]'>About Us!</h2>
          <p className='text-[#19182566] font-extralight'>Denonymous: The No 1 platform for Sharing video, image, audio and text responses anonymously. Register with us, create a Denonymous, and share with others to receive responses on any topic today.</p>
        </section>
        <section className='bg-black px-6 py-16 backgroundVector'>
          <div  className='sm:w-[60%] mx-auto'>
          <h2 className='text-white text-[20px] text-center mb-8 font-bold '> Empower Your Thoughts</h2>
          <p className='text-[#fff] font-extralight my-6 text-center'>Denonymous invites you to step into a world where your thoughts matter, and your identity remains concealed. Join us in creating a community built on understanding, support, and the freedom to express yourself without reservations. Be a part of the power of anonymity.</p>
          <Link href="/dashoard" className='gradient_elements_div text-[16px] w-full py-2 block rounded-md text-center sm:w-fit sm:px-8 sm:mx-auto'>Dashboard</Link>
</div>
        </section>
      </main>
    
    </section>
    </>
  )
}

export default page