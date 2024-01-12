import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie} = await req.json()
    const user = verifyUserDataToken(cookie)
    return NextResponse.json({user})
}