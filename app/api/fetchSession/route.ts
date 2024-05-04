import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    // const {cookie}=await req.json()
    const cookie = cookies().get("denon_session_0")
    let auth =false
    if(!cookie || !cookie.value){
        return NextResponse.json({auth})
    }
    const d = verifyUserDataToken(cookie.value)
    if(!d){
        return NextResponse.json({auth})
    }

    auth=true;
    return NextResponse.json({auth})
}