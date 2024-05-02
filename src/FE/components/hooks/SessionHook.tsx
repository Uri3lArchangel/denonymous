"use client";
import { URLRESOLVE, fetchNotificationsClient } from "@/src/core/lib/helpers";
import { userDataJWTType, userNotificationType } from "@/types";
import {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import React from "react";

const SessionContext = createContext<{
  session: boolean;
  fetchUser: () => Promise<void>;
  setSession:React.Dispatch<SetStateAction<boolean>>;
  user: userDataJWTType | null;
}>({
  session: false,
  setSession:()=>{} ,
  user: null,
  fetchUser: async () => {},
});
export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<userDataJWTType | null>(null);

  const fetchUser = async () => {
    fetch(URLRESOLVE("/api/fetchSession"), {
      next: { revalidate: 500, },
    }).then((res) => res.json().then((a) =>  setSession(a.auth)));
    
    fetch(URLRESOLVE("/api/fetchUserNav"), {
      next: { revalidate: 500 },
    }).then((res) =>
      res.json().then((a) => {
        setUser(a.data)      })
    );
    ;

  };


  return (
    <SessionContext.Provider value={{ session, setSession, fetchUser, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
