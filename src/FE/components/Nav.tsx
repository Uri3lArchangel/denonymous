import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { fetchNotficationsServer } from '@/src/BE/functions';
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions';
import dynamic from 'next/dynamic';
let NavComponentAuth:any;
let NavComponentNoAuth:any

  
const Nav = async() => {
  const cookie = cookies().get("denon_session_0")
if(cookie && cookie.value){
  const token = verifyUserDataToken(cookie.value)
  if(token){
    NavComponentAuth = dynamic(()=>import('./subcomponents/NavComponentAuth'))
    NavComponentNoAuth=null
const nots = await fetchNotficationsServer()
 return (
    <NavComponentAuth notifications={nots} />

  )

  }

 
}
 NavComponentNoAuth = dynamic(()=>import('./subcomponents/NavComponentNoAuth'))
 NavComponentAuth = null
  return (
    <NavComponentNoAuth />
  
  )
}

export default Nav