import React, { useState } from "react";
import { createDenonyous } from "@/src/BE/serverActions/actions";
import { denonymousType, userDataJWTType, userModelType } from "@/types";
import { cookies } from "next/headers";
import { MyDenonyms } from "./subcomponents/CreatePosts";
import { CreateDenonymousClient } from "./subcomponents/d";
import styles from "../../../styles/styles.module.css";
import { redirect } from "next/navigation";

export const fetchDenonymousOnLoad = async () => {
  const cookie = cookies().get("denon_session_0");

  if (!cookie || !cookie.value) {
    redirect("/auth/signin")
  };
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
  return user as userModelType
};

const CreatePost = async () => {
 try{ let posts = (await fetchDenonymousOnLoad()).denonymous;
  const username = (await fetchDenonymousOnLoad()).username;

  // const handlePostChange = () => {};

  // const handleReplySubmit = () => {};
  return (
    <>
      <section
        className={
          "bg-[#000000] min-h-[100vh] pt-24 " + styles.background
        }
      >
        <div className="mb-20">
          <h1 className="text-[#FEFEFE] md:text-[45px] sm:text-[30px] max-[599px]:text-[25px] text-center">
            {username}&apos;s Profile
          </h1>
          <p className="text-[#959595] text-[20px] max-[599px]:text-[12px] text-center">
            Create and receive responses to a Denonymous
          </p>
        </div>
          <CreateDenonymousClient />
        <h2>My Denonyms</h2>

        <div className="pb-10">
          <MyDenonyms posts={posts ? posts.reverse() : []} />
        </div>
      </section>
    </>
  );}catch(err:any){
    throw new Error("An error occurred while fetching denonyms|client")
  }
};

export default CreatePost;