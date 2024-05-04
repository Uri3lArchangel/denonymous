'use client'
import React, { createContext, useState } from 'react'

export const SessionContext = createContext<{state:boolean,set:(a:boolean)=>void}|null>(null)
function SessionContextComponent({children,defaultState}:{children:React.ReactNode,defaultState:boolean}) {
    const [session,setSession]=useState(defaultState)
  return (
    <SessionContext.Provider value={{state:session,set:(a:boolean)=>{setSession(a)}}}>
        {children}
    </SessionContext.Provider>
  )
}

export default SessionContextComponent