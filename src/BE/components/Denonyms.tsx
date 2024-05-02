import dynamic from "next/dynamic";
let MyDenonyms:any;

import { userModelType } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import LoadingSkeleton from "@/src/FE/components/assets/LoadingSkeleton";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";

export const fetchDenonymousOnLoad = async () => {
  const cookie = cookies().get("denon_session_0");

  if (!cookie || !cookie.value) {
    redirect("/auth/signin");
  }

  const res = await fetch(process.env.baseURL + "/api/fetchUser", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ cookie: cookie.value }),
    next: {
      revalidate: false,
      tags: ["denonymous_box_0102"],
    },
  });

  const data = await res.json();
  let user = data.data;
  return user as userModelType;
};
export async function Denonyms() {
  const user = await fetchDenonymousOnLoad();
  let denonyms = user.denonymous;
  MyDenonyms = dynamic(
    () => import("@/src/FE/components/subcomponents/CreatePosts"),
    {
      ssr: true,
      loading(loadingProps) {
        return (
          <div>
            {denonyms.map((_, i) => (
              <LoadingSkeleton key={i} className="h-[300px] my-4 w-full mx-auto max-w-[565px]" />
            ))}
          </div>
        );
      },
    }
  )
  
  return (
    <EdgeStoreProvider>
  <MyDenonyms denonyms={denonyms ? denonyms.reverse() : []} />
  </EdgeStoreProvider>);
}

export async function UsernameDisplay() {
  const user = await fetchDenonymousOnLoad();

  const username = user.username;

  return (
    <>
      <h1 className="text-[#FEFEFE] md:text-[45px] sm:text-[30px] max-[599px]:text-[25px] text-center">
        {username}&apos;s Profile
      </h1>
      <p className="text-[#959595] text-sm text-center">
        {/* Create and receive responses to a Denonymous */}
      </p>
    </>
  );
}
