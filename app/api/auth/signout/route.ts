import { deleteSessionCookie } from "@/src/core/lib/Cookie";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
  try{  

    const cookie = cookies().get('denon_session_0')

    if(!cookie || !cookie.value){
      return  NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
    }
    deleteSessionCookie()
    return NextResponse.json([true,null])
  }catch(err:any){
    return NextResponse.error()
  }
}