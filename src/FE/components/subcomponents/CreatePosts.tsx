"use client";

import { denonymousType } from "@/types";

export const MyDenonyms = ({ posts }: { posts?: denonymousType[] }) => {
  return (
    <ul>
      {posts
        ? posts.map((e, i) => (
            <li className="border border-black px-8  w-fit py-4" key={i}>
              topic:{e.topic} <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> responses:
              {e.replys.length} <br />
              link: {e.link} <br />{" "}
              <label
                className="cursor-pointer select-none"
                htmlFor="show_responses"
              >
                responses visible to others?
              </label>{" "}
              <input
                className="cursor-pointer"
                id="show_responses"
                type="checkbox"
              />
            </li>
          ))
        : [].map((e, i) => <li key={i}></li>)}
    </ul>
  );
};
