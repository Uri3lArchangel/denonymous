import {
  connectMongoClient,
  disConnectMongoClient,
} from "@/src/BE/DB/conection";
import { updateUserEmailStatusByUUID } from "@/src/BE/DB/queries/auth/query";
import { setSessionCookie } from "@/src/core/lib/Cookie";
import { userDataTokenSign } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const key = useSearchParams().get("key");
    if (!key) throw new Error("Invalid verification key");
    await connectMongoClient();
    const user = (await updateUserEmailStatusByUUID(key)) as userModelType;
    const token = userDataTokenSign(
      user.email,
      user.UUID,
      user.isEmailVerified,
      user.isPremium
    );
    setSessionCookie(token);
    await disConnectMongoClient();
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (err: any) {
    console.log(err);
    // this return would be modified with if else to check for several possible errors and return the appropraite messages and the respective status codes
    // e g the check logic is to see if an email is already on the db and return a fitting response to users
    const errorMessage = err.message as string;
    if (
      errorMessage.includes("duplicate key error") &&
      errorMessage.includes("email")
    ) {
      return NextResponse.json(
        {
          message: "This email is already registered, try signing in",
          data: null,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "internal error", data: null },
      { status: 500 }
    );
  }
}
