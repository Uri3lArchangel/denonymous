import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { signUpConfirmation } from "@/src/BE/email-service/nodemailer";
import { signKeyData, verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        
    const cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value){
        return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
    }
    const userData = verifyUserDataToken(cookie.value)
    if(!userData){
        return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
    }
    const email = userData.email
    const user = await findUserByEmail(email)
    if(user.isEmailVerified){
        return NextResponse.redirect(new URL("/",req.nextUrl))
    }

    return NextResponse.json({message:"verification link sent"})
}catch(err:any){

    }
}