import { redirect } from "next/navigation";
import Subscription from "./Subscription";
import { cookies } from "next/headers";
import { verifyUserDataToken } from "@/src/core/lib/JWTFuctions";




const page = async() => {
  const cookie = cookies().get("denon_session_0")
  if(!cookie || !cookie.value){
   redirect("/auth/signin")
  }
  const user = verifyUserDataToken(cookie.value)
  if(!user){
    redirect("/auth/signin")
  }
  return (
    <Subscription email={user.email} RPC={process.env.RPC!} premium={user.premium} />
  );
};

export default page;
