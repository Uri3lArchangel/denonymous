import { connectMongo } from "@/connection";
import UserSec from "@/src/BE/DB/schema/UserSecondary";
import { u1 } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {username}=await req.json()
        console.log({username})
        await connectMongo()
        const u1 = await UserSec.findOne({username}) as u1

        if(!u1){
            return NextResponse.json([{points:0,auth:false},null])
        }
        
        return NextResponse.json([{points:u1.points,auth:true},null])

    } catch (error:any) {
        return NextResponse.json([null,error.message])
        
    }
    
}