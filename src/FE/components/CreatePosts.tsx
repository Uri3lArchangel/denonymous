import React, { useState } from "react";
import { createDenonyous } from "@/src/BE/serverActions/actions";
import { denonymousType, userDataJWTType, userModelType } from "@/types";
import { cookies } from "next/headers";
import { MyDenonyms } from "./subcomponents/CreatePosts";

export const fetchDenonymousOnLoad = async () => {
  const cookie = cookies().get("denon_session_0");

  if (!cookie || !cookie.value) return; []
  const res = await fetch(process.env.baseURL + "/api/fetchUser", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ cookie: cookie.value }),
    next: {  
          revalidate: 1,  
          tags:["denonymous_box_0102"]
    },
  });
   

  if (res.status == 301) return;


  const data = (await res.json()) ;
  if(!data.data) return []
  let user = data.data 
  return user.denonymous as denonymousType[];
};

const CreatePost = async () => {
  let posts = await fetchDenonymousOnLoad();
  // const handlePostChange = () => {};

  // const handleReplySubmit = () => {};
  return (
    <div >
      <h1>Create a Denonymous</h1>
      <form action={createDenonyous}>
        <input
          placeholder="denonymous title"
          name="topic"
          className="border border-black"
        />
        <textarea name="description" id="" cols={30} className="block" rows={10} placeholder="write a short description (optional)"></textarea>
        <button className="bg-green-400" type="submit">
          Create
        </button>
      </form>
      <h2>My Denonyms</h2>
      <div>
       <MyDenonyms posts={posts?posts.reverse():[]} />
      </div>
    </div>
  );
};

export default CreatePost;
