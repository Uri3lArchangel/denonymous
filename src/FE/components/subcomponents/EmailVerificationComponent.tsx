
import React from 'react'
import SixDigitInputField from '../subcomponents/SixDigitInputField'
import emailImg from '../../../../public/images/email.svg'
import Image from 'next/image'
import ChangeEmail from './ChangeEmail'

async function EmailVerificationComponent({email,tab}:{email:string,tab:"Verify Email"|"Change Email"}) {
  return (<>
<div className='flex flex-col items-center w-full space-y-4'>
{ 
tab == "Change Email"?<></>:
<>
<Image src={emailImg} alt='email' />
  <h1 className='text-2xl font-bold text-[#E8E1DC]'>Verify your mail</h1>
  <p className='text-white text-center w-full break-all'>A 6 digit OTP code was sent to {email} </p>
  <p className='text-white text-center w-full'>Enter the code to complete the verification process</p>
  </>}
  {tab == "Change Email"?<></>:
  <SixDigitInputField email={email} />
}
</div>
{tab == "Verify Email"?<></>:<ChangeEmail email={email} />}

</>
  )
}

export default EmailVerificationComponent