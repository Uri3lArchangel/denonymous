import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { redirect } from 'next/navigation';
import { fetchNotficationsServer } from '@/src/BE/functions';
import NavComponentAuth from './subcomponents/NavComponentAuth';
import NavComponentNoAuth from './subcomponents/NavComponentNoAuth';



  
const Nav = async() => {
  const cookie = cookies().get("denon_session_0")
if(cookie && cookie.value){
const nots = await fetchNotficationsServer()

  return (
    <NavComponentAuth notifications={nots} />

  )
}
 
  return (
    <NavComponentNoAuth />
  
  )
}

export default Nav