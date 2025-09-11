'use client'
import React, { useEffect, useState } from "react";
import { fetchUser, filterMediaLimitOn } from "@/src/core/lib/helpers";
import { denonymousType, u1, userDataJWTType, userModelType } from "@/types";
import dynamic from "next/dynamic";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";
import style from "@/public/styles/styles.module.css";
import { MultiFileDropzoneUsage } from "@/src/FE/components/subcomponents/MultiFileComponent";
import Link from "next/link";
import UserSec from "@/src/BE/DB/schema/UserSecondary";
import { connectMongo } from "@/connection";
let Responses: any = null;

async function ResponsePageComponent({
  username,
  userdata,
  key_,
  isSession,
}: {
  username: string;
  userdata?: userDataJWTType;
  key_: string;
  isSession: boolean;
}) {
  const key = key_;
  const [pollingData, setPollingData] = useState<{
    all: userModelType | null;
    u1: u1 | null;
    d: denonymousType | null;
    replys: any[];
    isPremium: boolean;
    mediaLimit: number;
  }>({
    all: null,
    u1: null,
    d: null,
    replys: [],
    isPremium: false,
    mediaLimit: 0
  });

  const fetchData = async () => {
    try {
      const all = (await fetchUser(username)) as userModelType;
      await connectMongo();
      let u1 = await UserSec.findOne({ username: all.username }) as u1;
      if (!u1) {
        await UserSec.create({ points: 0, username });
        u1 = await UserSec.findOne({ username: all.username }) as u1;
      }
      
      const isPremium = Boolean(all.isPremium || (u1?.premiumDenonymousBoxes?.includes(key_) || false));
      
      if (!all) {
        throw new Error("0001");
      }

      const { filterDenonymous } = await import("@/src/core/lib/helpers");
      let d = filterDenonymous(all, key) as denonymousType;
      
      if (!d) {
        throw new Error("0002");
      }

      let replys = d.replys || [];
      const mediaLimit = filterMediaLimitOn(all.denonymous, key);

      setPollingData({
        all,
        u1,
        d,
        replys,
        isPremium,
        mediaLimit
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [username, key_]);

  // Set up polling
  useEffect(() => {
    const intervalId = setInterval(fetchData, 7000); // Poll every 7 seconds
    
    return () => {
      clearInterval(intervalId); // Clean up on component unmount
    };
  }, [username, key_]);

  if (!pollingData.all || !pollingData.d) {
    return <div>Loading...</div>;
  }

  const { all, u1, d, replys, isPremium, mediaLimit } = pollingData;

  if (isSession && d.owner == userdata?.email) {
    Responses = dynamic(
      () => import("@/src/FE/components/subcomponents/Responses")
    );

    return (
      <>
        <div>
          <h1 className="text-3xl sm:text-4xl text-center text-ellipsis text-white max-w-[600px] mx-auto break-words">
            {d.topic}
          </h1>
          <h2 className="text-center text-[#7F7F7F] mb-20 max-w-[400px] mx-auto break-words">
            {d.description ? d.description : ""}
          </h2>
          <div className="bg-[#1E1E1E] max-w-[750px] mx-auto w-full rounded-md ">
            {Responses && (
              <Responses box={d.topic} owner={d.owner} r={replys.reverse()} />
            )}
          </div>
        </div>
      </>
    );
  } else {
    if (d.responsesViewState == false) {
      Responses = null;
    } else {
      Responses = dynamic(
        () => import("@/src/FE/components/subcomponents/Responses")
      );
    }

    return (
      <div className={style.denonymousResponsePage}>
        <div>
          {
            <main className="py-10">
              <h1 className="text-4xl sm:text-4xl text-center text-ellipsis text-white max-w-[600px] mx-auto break-words">
                {isPremium ? "👑" : null}{d.topic}
              </h1>
              <h2 className="text-center text-[#7F7F7F] mb-20 max-w-[400px] mx-auto break-words">
                {d.description ? String(d.description) : ""}
              </h2>

              {d.isActive ? (
                <form
                  id="reply_form"
                  className={`${isPremium ? "gradient_elements_div" : "bg-[#1E1E1E]"} rounded-md max-w-[750px] px-4 py-12 md:px-12 mx-auto md:h-fit`}
                >
                  <h3 className={`text-center text-xl font-semibold ${isPremium ? "text-black" : "gradient_elements_text"}`}>
                    Send Response
                  </h3>
                  <p className={`text-center ${isPremium ? "text-[#454545]" : "text-[#7F7F7F]"} py-4`}>
                    send text, photos, audios and even videos to {username}
                  </p>
                  <div className={`shadow-div rounded-[14px] bg-[#171717] pt-[1em] w-full max-w-[500px] mx-auto ${isPremium ? "" : "border-2 border-b-[#daa521] border-t-[#f6d108] border-r-[#ffdf00] border-l-[#edc211]"}`}>
                    <textarea
                      maxLength={600}
                      name="text_reply"
                      id="response"
                      className="block text-white w-full md:w-[94%] mx-auto bg-[#0d0d0d] rounded-[10px] outline-none p-2 text-white/78 md:h-[200px]"
                      rows={10}
                    />
                    <div>
                      <EdgeStoreProvider>
                        <MultiFileDropzoneUsage
                          username={username}
                          key_={key}
                          mediaLimit={mediaLimit}
                          premium={isPremium}
                        />
                      </EdgeStoreProvider>
                    </div>
                  </div>
                </form>
              ) : (
                <section className="text-center text-lg sm:text-xl text-white">
                  This denonymous is currently not active
                </section>
              )}
            </main>
          }
        </div>
        <div className={`${isPremium ? "gradient_elements_div" : "bg-[#1e1e1e]"} max-w-[750px] mx-auto w-full rounded-md p-6`}>
          {!d.responsesViewState ? <p className="text-2xl text-white text-center">All responses have been hidden by {username}</p> : null}
          {Responses && <Responses owner={d.owner} premium={isPremium} r={replys.reverse()} />}
          <div className={isPremium ? "bg-black rounded-bl-xl rounded-br-xl" : ""}>
            {userdata ? (
              <Link
                href="/dashboard"
                className="gradient_elements_div text-[16px] py-4 block rounded-md w-full mx-auto text-center max-w-[250px] my-4">
                Get your own messages
              </Link>
            ) : (
              <div className="flex justify-center flex-wrap max-w-[400px] mx-auto">
                <Link href="/auth/signup" className='gradient_elements_div px-6 py-4 max-w-[150px] text-center my-4 mx-auto block text-black rounded-md ml-2'>Sign up</Link>
                <Link href="/auth/signin" className='gradient_elements_text border max-w-[150px] text-center my-4 mx-auto block border-[#ffdf00] mr-2 px-6 py-4 rounded-md'>Sign in</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ResponsePageComponent;
