import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    let {cookie} =await req.json()
  
    if(!cookie) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
  
    const token = verifyUserDataToken(cookie)
    if(!token) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
const user = await findUserByEmail(token.email) as userModelType
if(!user){
     return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
}
return NextResponse.json({data:user},{status:200})
}