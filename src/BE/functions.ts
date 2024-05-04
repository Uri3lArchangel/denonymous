import { userNotificationType } from "@/types";
import { cookies } from "next/headers";

export const fetchNotficationsServer = async () => {
 try{ const cookie = cookies().get("denon_session_0");
  const res = await fetch(process.env.baseURL + "/api/fetchUser", {
    next: { tags: ["notifications_fetch_tag"], revalidate: false },
    method: "POST",
    body: JSON.stringify({ cookie:cookie?.value }),
  });
  const data = await res.json();
  if (!data.data) return [];
  return data.data.notifications as userNotificationType[];}catch(err:any){
    console.log(err)
    return []
  }
};
