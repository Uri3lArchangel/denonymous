import SettingsComponent from '@/src/FE/components/SettingsComponent'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata:Metadata = {
  title: 'Settings | Denonymous',
  robots:{
    index:false,
    follow:false
  },
 
}

const fetchUserDetails=async()=>{
const cookie = cookies().get("denon_session_0")
if(!cookie || ! cookie.value){
  redirect("/auth/signin")
}

const user = verifyUserDataToken(cookie.value)
if(!user){
  redirect("/auth/signin")
}
return user
}


const page = async() => {
  const user = await fetchUserDetails()
  return (
<SettingsComponent username={user.username} email={user.email} verified={user.verified}  />
    )
}

export default page