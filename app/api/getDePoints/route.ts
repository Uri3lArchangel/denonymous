import { connectMongo } from "@/connection";
import UserSec from "@/src/BE/DB/schema/UserSecondary";
import { cookieKey } from "@/src/core/data/constants";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { u1 } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const cookie = cookies().get(cookieKey)
        console.log({cookie})
        if(!cookie||!cookie.value){
            return NextResponse.json([{points:0,auth:true},null])
        }
        const user = verifyUserDataToken(cookie.value)
        console.log({user})

        if(!user){
            return NextResponse.json([{points:0,auth:true},null])
        }       

        await connectMongo()
        const u1 = await UserSec.findOne({username:user.username}) as u1
        console.log({user:user.username,u1})
        if(!u1){
            return NextResponse.json([{points:0,auth:true},null])
        }
        
        return NextResponse.json([{points:u1.points,auth:true},null])

    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json([null,error.message])
        
    }
    
}