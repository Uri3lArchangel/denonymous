import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { signUpConfirmation } from "@/src/BE/email-service/nodemailer";
import { signKeyData } from "@/src/core/lib/JWTFuctions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{const {email} = await req.json()
    const user = await findUserByEmail(email)
    if(user.isEmailVerified){
        return NextResponse.redirect(new URL("/",req.nextUrl))
    }
    const key = signKeyData({email})
    await signUpConfirmation(email,key)
    return NextResponse.json({message:"verification link sent"})
}catch(err:any){

    }
}