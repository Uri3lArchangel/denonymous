"use client";

<<<<<<< HEAD
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
=======
import { denonymousType } from "@/types"
import { FaRegCopy } from "react-icons/fa";


export const MyDenonyms=({posts}:{posts?:denonymousType[]})=>{
const copyLink=()=>{
 const link = document.getElementById("link") as HTMLDivElement;
 navigator.clipboard.writeText(link.innerText)
 alert("copied")
}
return(       

    <ul>
    {posts
      ? posts.map((e, i) => <li className="border border-black px-8 my-2 w-fit py-4" key={i}>topic:{e.topic} <br /> date created:{new Date(e.dateCreated).toLocaleDateString()} <br /> responses:{e.replys.length} <br /> link: <span id="link" > {e.link} <FaRegCopy onClick={copyLink} size={20} className=" cursor-pointer" /></span><br /> <label className="cursor-pointer select-none" htmlFor="show_responses">responses visible to others?</label> <input className="cursor-pointer" id="show_responses" type="checkbox" defaultChecked={e.responsesViewState} /></li>)
      : [].map((e, i) => <li key={i}></li>)}
  </ul>
)
}
>>>>>>> e379fd56533df271de6f12eb9923aafaa66e2213
