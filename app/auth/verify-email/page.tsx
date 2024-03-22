import React, { useRef } from "react";

import VerifyEmail from "@/src/FE/components/subcomponents/Verify-email";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";

function page() {
// const cookie = cookies().get("denon_session_0")
// if(!cookie || !cookie.value){
//   // redirect("/auth/signin")
//   return
// }
// const user = verifyUserDataToken(cookie.value)
// if(!user){
//     // redirect("/auth/signin")
// }


  return (
 
<VerifyEmail email={"user!.email"} />
  );
}

export default page;