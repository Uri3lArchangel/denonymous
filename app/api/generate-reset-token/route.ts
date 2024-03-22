import { findUserByEmail } from "@/src/BE/DB/queries/auth/query";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const {email}=await req.json()
        const user = await findUserByEmail(email)
        if(!user){
            return NextResponse.json({type:"error",message:"No account with this Email was found"})
        }
        
    }catch(err:any){

    }
}