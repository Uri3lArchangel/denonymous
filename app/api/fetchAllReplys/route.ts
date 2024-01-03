import { connectMongoClient, disConnectMongoClient } from "@/src/BE/DB/conection";
import { fetchAllDenonyms } from "@/src/BE/DB/queries/auth/query";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { UUID,topic }: { UUID: string,topic:string } = await req.json();
await connectMongoClient()
    const replys = await fetchAllDenonyms(UUID,topic);
    await disConnectMongoClient()
    return NextResponse.json({ replys },{status:200});
  } catch (err: any) {
    console.log(err);
    // this return would be modified with if else to check for several possible errors and return the appropraite messages and the respective status codes
    // e g the check logic is to see if an email is already on the db and return a fitting response to users

    return NextResponse.json(
      { message: "internal error", data: null },
      { status: 500 }
    );
  }
}
