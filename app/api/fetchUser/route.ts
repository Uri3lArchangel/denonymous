import { connectMongoClient, disConnectMongoClient } from "@/src/BE/DB/conection";
import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie} =await req.json()
    if(!cookie ) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
  
    const token = verifyUserDataToken(cookie)
    console.log(token,1)
    if(!token) return NextResponse.redirect(new URL("/auth/sigin",req.nextUrl));
    await connectMongoClient()
const user = await findUserByEmail(token.email) as userModelType
await disConnectMongoClient()
return NextResponse.json({message:"",data:user},{status:200})
}