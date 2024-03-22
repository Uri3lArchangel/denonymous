import { connectMongoClient } from "@/src/BE/DB/conection";
import { NextResponse } from "next/server";

export async function GET(){
   await connectMongoClient()
   return NextResponse.json({})
}