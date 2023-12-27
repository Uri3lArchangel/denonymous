import { findUserByEmailAndPassword } from "@/src/BE/DB/queries/auth/query";
import { userModelType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {email,password}= await req.json()
    const user = await findUserByEmailAndPassword(email,password) as userModelType
    if(!user){
        return NextResponse.json({message:"Incorrect email or password",data:null})
    }
    if(!user.isEmailVerified){
        return NextResponse.redirect(new URL('/auth/verify-email',req.nextUrl))
    }
    

}