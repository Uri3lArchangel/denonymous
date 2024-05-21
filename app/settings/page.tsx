import SettingsComponent from '@/src/FE/components/SettingsComponent'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata:Metadata = {
  title: 'Settings | Denonymous',
  description:"Manage your account settings on Denonymous. Update your personal information such as email and password. Delete your account with a confirmation prompt. Customize your preferences to enhance your Denonymous experience.",
  keywords: [
    "Denonymous",
    "anonymous messaging app",
    "account settings",
    "personal information",
    "email",
    "password",
    "account deletion",
    "confirmation prompt",
    "preferences"
],
  robots:{
    index:true,
    follow:true
  },
 
}

const fetchUserDetails=()=>{
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
  const user = fetchUserDetails()
  return (
<SettingsComponent username={user.username} email={user.email} verified={user.verified}  />
    )
}

export default page