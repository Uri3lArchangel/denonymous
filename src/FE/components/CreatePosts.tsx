import React, { useState } from "react";
import FileUpload from "./FileUpload";
import AudioRecorder from "./AudioRecorder";
import { createDenonyous } from "@/src/BE/serverActions/actions";
import { baseUrl } from "@/src/core/extras/globalData";
import { denonymousType, userDataJWTType, userModelType } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { MyDenonyms } from "./subcomponents/CreatePosts";

const fetchDenonymous = async () => {
  const cookie = cookies().get("denon_session_0");
  if (!cookie || !cookie.value) return; []
  const res = await fetch(baseUrl + "/api/fetchUser", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ cookie: cookie.value }),
    next: {  
          revalidate: false,
    },
  });
   

  if (res.status == 301) return;


  const data = (await res.json()) ;
  if(!data.data) return []
  let user = data.data 

  return user.denonymous as denonymousType[];
};

const CreatePost = async () => {
  let posts = await fetchDenonymous();
  const handlePostChange = () => {};

  const handleReplySubmit = () => {};

  return (
    <div>
      <h1>Create a Denonymous</h1>
      <form action={createDenonyous}>
        <input
          placeholder="denonymous title"
          name="topic"
          className="border border-black"
        />
        <button className="bg-green-400" type="submit">
          Create
        </button>
      </form>
      <h2>My Denonyms</h2>
      <div>
       <MyDenonyms posts={posts} />
      </div>
    </div>
  );
};

export default CreatePost;
