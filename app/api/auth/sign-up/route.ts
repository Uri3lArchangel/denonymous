import {
  connectMongoClient,
  disConnectMongoClient,
} from "@/src/BE/DB/conection";
import { createUser } from "@/src/BE/DB/queries/auth/query";
import { Email_Signup_Verification } from "@/src/BE/email-service/resend-config";
import { passwordHasher } from "@/src/core/lib/hashers";
import { userModelType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword } = await req.json();

    // let the same email password and confirm password checks be done servers side too incase of sneaky users

    // for any checks error on the email, password, confirmPassword, return the following line of code and place your error message in the message field

    //   NextResponse.json({message:"",data:null},{status:400})
    const hash = passwordHasher(password);
    await connectMongoClient();
    const user = (await createUser(email, hash)) as userModelType;
    await disConnectMongoClient();
    const status = await Email_Signup_Verification(user.UUID, user.email);
    console.log(status, "email");
    return NextResponse.json(
      { status: "success", message: "" },
      { status: 201 }
    );
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
