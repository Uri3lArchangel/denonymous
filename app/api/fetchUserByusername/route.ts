import {  fetchUsernameData } from "@/src/BE/DB/queries/auth/query";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username }: { username: string } = await req.json();
    const all = await fetchUsernameData(username);
    return NextResponse.json({ user:all },{status:200});
  } catch (err: any) {
    // this return would be modified with if else to check for several possible errors and return the appropraite messages and the respective status codes
    // e g the check logic is to see if an email is already on the db and return a fitting response to users

    return NextResponse.json(
      { message: "internal error", data: null },
      { status: 500 }
    );
  }
}
