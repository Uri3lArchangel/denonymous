'use client'
import Link from 'next/link';
import React from 'react'
import { useSession } from '../hooks/SessionHook';
import { useRouter } from 'next/navigation';

function Signout() {
    const { setSession } = useSession();
    const router = useRouter()
  return (
    <Link
    href={"/api/auth/signout"}
    onClick={(e) => {
        e.preventDefault()
      setSession(false);
router.push("/api/auth/signout")
    }}
    className="bg-red-500 px-6 py-2 rounded-md"
  >
    Sign out
  </Link>  )
}

export default Signout