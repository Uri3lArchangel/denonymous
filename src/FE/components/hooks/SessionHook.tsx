'use client'
import { URLRESOLVE, fetchNotificationsClient } from "@/src/core/lib/helpers";
import { userDataJWTType, userNotificationType } from "@/types";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import React from 'react'


const SessionContext = createContext<{session:boolean,setSession:React.Dispatch<React.SetStateAction<boolean>>,fetchUser:()=>Promise<void>,user:userDataJWTType|null}>({session:false,setSession:()=>{},user:null,fetchUser:async()=>{}})
export const SessionProvider = ({children}:{children:React.ReactNode})=>{
    const [session,setSession] = useState(false)
    const [user,setUser]=useState<userDataJWTType|null>(null)

  const fetchUser = async()=>{
    const res = await fetch(URLRESOLVE("/api/fetchUserNav"))
    const data = await res.json()
    setUser(data.data)
  }
    useLayoutEffect(()=>{
        const run = async()=>{
        const res = await fetch(URLRESOLVE("/api/fetchSession"))
        const data = await res.json()
        setSession(data.auth)
          await fetchUser()
        }
        run()
    
    },[])
    return (
        <SessionContext.Provider value={{session,setSession,fetchUser,user}}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = ()=>useContext(SessionContext)
