
import { updateUserEmailStatusByUUID } from "@/src/BE/DB/queries/auth/query";
import { setSessionCookie } from "@/src/core/lib/Cookie";
import { userDataTokenSign } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    if (!key) throw new Error("Invalid verification key");
    const user = (await updateUserEmailStatusByUUID(key)) as userModelType;
    const token = userDataTokenSign(
      user.username,
      user.email,
      user.UUID,
      user.isEmailVerified,
      user.isPremium
    );
    setSessionCookie(token);
    
    return NextResponse.redirect(new URL("/auth/signin",req.nextUrl));
  } catch (err: any) {
    console.log(err);
    // this return would be modified with if else to check for several possible errors and return the appropraite messages and the respective status codes
    // e g the check logic is to see if an email is already on the db and return a fitting response to users
    const errorMessage = err.message as string;

    return NextResponse.json(
      { message: "internal error", data: null },
      { status: 500 }
    );
  }
}
