import { changeEmail, findUserByEmail, resetVerificationToken } from "@/src/BE/DB/queries/auth/query";
import { signUpConfirmation } from "@/src/BE/email-service/nodemailer";
import { signKeyData, verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const {newEmail}=await req.json()
    const cookie = cookies().get("denon_session_0")
    if(!cookie || !cookie.value){
        return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
    }
    if(!newEmail){
    const userData = verifyUserDataToken(cookie.value)
    if(!userData){
        return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
    }
    const email = userData.email

    const u = await resetVerificationToken(email)

    if(u.type =="success"){

    await signUpConfirmation(email,u.data.token.value)
    return NextResponse.json({type:"success",message:"email sent successfully"})
    }else{

    return NextResponse.json({...u,timer:u.data.token.nextRequestable})
    }
    }else{
        const userData = verifyUserDataToken(cookie.value)
        if(!userData){
            return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
        }
        const email = userData.email
        await changeEmail(email,newEmail)
        const u = await resetVerificationToken(newEmail)
        if(u.type=="success"){
        await signUpConfirmation(newEmail,u.data.token.value)
        return NextResponse.json({type:"success",message:"email sent successfully"})
        }else{
        return NextResponse.json({...u,timer:u.data.token.nextRequestable})
        }
    }


}catch(err:any){console.log(err)
    return NextResponse.json({type:"error",message:"An error occured"},{status:500})

    }
}