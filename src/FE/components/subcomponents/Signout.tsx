"use client";
import React from "react";
import { useSession } from "../hooks/SessionHook";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { URLRESOLVE } from "@/src/core/lib/helpers";

function Signout() {
  const { setSession } = useSession();
  const signout = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
        message.destroy();
        message.loading("signing out...", 100000);
        const res = await fetch(URLRESOLVE("/api/auth/signout"),{cache:"no-cache"});
        const [_, error] = await res.json();
        if (error) {
          return;
        }
        setSession(false);
        message.destroy();
        message.success("signed out");
        window.location.reload()
  }
  return (
    <button
      onClick={signout}
      className="bg-red-500 px-6 py-2 rounded-md"
    >
      Sign out
    </button>
  );
}

export default Signout;
