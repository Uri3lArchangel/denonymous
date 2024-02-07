"use client";

import { denonymousType } from "@/types";
import Link from "next/link";
import styles from "../../../../styles/styles.module.css";
import { useState } from "react";

export const MyDenonyms = ({ posts }: { posts?: denonymousType[] }) => {
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    setLink;
  };

  return (
    <ul className="grid grid-cols-1 gap-4 mx-auto">
      {posts
        ? posts.map((e, i) => (
            <li
              className="border border-[#EDC211] px-8 text-white max-w-[100%] w-[30rem] rounded-lg h-[14rem] py-4 bg-[#242222] mx-auto"
              key={i}
            >
              <h2 className="text-3xl font-bold text-center uppercase">
                {e.topic}
              </h2>
              {/* <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> */}
              <section className="flex items-center justify-between">
                <div className="relative w-min flex items-center pl-10 mt-7 mb-10">
                  <svg
                    width="140"
                    height="100"
                    viewBox="0 0 124 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      e.replys.length > 100
                        ? "absolute translate-x-[-56px]"
                        : "absolute translate-x-[-67px]"
                    }
                  >
                    <circle
                      cx="74.2719"
                      cy="44.6826"
                      r="35.136"
                      stroke="url(#paint0_linear_223_1227)"
                      stroke-width="16"
                    />
                    <path
                      d="M74.2719 21.3889L75.135 0.683247"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <line
                      x1="90.8346"
                      y1="23.5814"
                      x2="105.501"
                      y2="5.46433"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <line
                      x1="96.0886"
                      y1="35.015"
                      x2="122.833"
                      y2="26.3878"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <line
                      x1="98.9231"
                      y1="49.6462"
                      x2="117.198"
                      y2="54.3157"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <line
                      x1="91.1716"
                      y1="63.0687"
                      x2="105.838"
                      y2="76.8723"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <line
                      x1="2.76942"
                      y1="69.0483"
                      x2="12.4095"
                      y2="76.4609"
                      stroke="#242222"
                      stroke-width="6"
                    />
                    <line
                      x1="73.6838"
                      y1="71.4265"
                      x2="73.6838"
                      y2="88.6809"
                      stroke="#242222"
                      stroke-width="4"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_223_1227"
                        x1="6.67732"
                        y1="52.2425"
                        x2="147.647"
                        y2="56.2448"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.105903" stop-color="#DAAD20" />
                        <stop offset="1" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className={`${styles.gradientHeader} font-bold text-3xl `}>
                    {e.replys.length > 100 ? "99+" : e.replys.length}
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    className="cursor-pointer mx-3"
                    id="show_responses"
                    type="checkbox"
                  />
                  <label
                    className="cursor-pointer select-none"
                    htmlFor="show_responses"
                  >
                    Hide all responses
                  </label>{" "}
                </div>
              </section>
              <div className="flex items-center justify-between">
                <Link href={e.link} target="blank">
                  <button
                    className={`${styles.signInBtn} rounded p-2 text-[#0f0f0f]`}
                  >
                    View Responses
                  </button>
                </Link>
                <div className="flex">
                  <button
                    className={`${styles.signInBtn} rounded-l px-4 text-[#0f0f0f]`}
                    onClick={async () => {
                      setLink(e.link);
                      try {
                        await navigator.clipboard.writeText(link);
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 3000);
                      } catch (err) {
                        console.error("Unable to copy to clipboard:", err);
                      }
                    }}
                  >
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5705 0.872658C11.5705 0.757589 11.55 0.643656 11.5103 0.537416C11.4705 0.431176 11.4123 0.334728 11.3389 0.253622C11.2655 0.172517 11.1784 0.108355 11.0826 0.0648313C10.9868 0.0213074 10.8842 -0.000719691 10.7807 1.79307e-05H0.789813C0.686331 -0.000719691 0.58374 0.0213074 0.487945 0.0648313C0.392149 0.108355 0.305041 0.172517 0.231633 0.253622C0.158226 0.334728 0.0999687 0.431176 0.0602155 0.537416C0.0204623 0.643656 -2.126e-06 0.757589 1.65658e-10 0.872658V14.7902C-2.126e-06 14.9052 0.0204623 15.0192 0.0602155 15.1254C0.0999687 15.2316 0.158226 15.3281 0.231633 15.4092C0.305041 15.4903 0.392149 15.5545 0.487945 15.598C0.58374 15.6415 0.686331 15.6635 0.789813 15.6628C0.934287 15.6628 1.05141 15.5457 1.05141 15.4012V3.15795C1.05141 2.05338 1.94684 1.15794 3.05141 1.15794H11.2852C11.4428 1.15794 11.5705 1.03022 11.5705 0.872658Z"
                        fill="black"
                      />
                      <path
                        d="M12.8281 2.2373H2.76684C2.35008 2.2373 2.01224 2.61297 2.01224 3.07638V17.061C2.01224 17.5244 2.35008 17.9001 2.76684 17.9001H12.8281C13.2449 17.9001 13.5827 17.5244 13.5827 17.061V3.07638C13.5827 2.61297 13.2449 2.2373 12.8281 2.2373Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <button
                    className={`${styles.signInBtn} rounded-r px-4 py-2 text-[#0f0f0f]`}
                  >
                    {" "}
                    Share
                  </button>
                </div>
              </div>
            </li>
          ))
        : [].map((e, i) => <li key={i}></li>)}
    </ul>
  );
};
