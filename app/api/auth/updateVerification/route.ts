import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { setSessionCookie } from "@/src/core/lib/Cookie";
import { userDataTokenSign, verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie} =await req.json()
    if(!cookie ) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
  
    const token = verifyUserDataToken(cookie)
    if(!token) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
const user = await findUserByEmail(token.email) as userModelType
if(user.isEmailVerified){
    const newToken = userDataTokenSign(user.username,user.email,user.UUID,user.isEmailVerified,user.isPremium)
    setSessionCookie(newToken)

}
return NextResponse.redirect(new URL("/",req.nextUrl))

}