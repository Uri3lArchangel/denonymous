import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value) return NextResponse.json({data:null},{status:200})

  
    const token = verifyUserDataToken(cookie.value)
    // if(!token) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
return NextResponse.json({data:token})
}