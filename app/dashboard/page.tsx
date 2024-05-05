import dynamic from "next/dynamic";
import styles from "@/public/styles/styles.module.css";
import { Metadata } from "next";
import { CreateDenonymousClient } from "@/src/FE/components/subcomponents/d";
import LoadingSkeleton from "@/src/FE/components/assets/LoadingSkeleton";
import { Suspense } from "react";
import { Denonyms, UsernameDisplay } from "@/src/BE/components/Denonyms";

export const metadata: Metadata = {
  title: "Dashboard | Denonymous",
  description:
    "Manage and create custom response boxes, known as Denonymous, for receiving anonymous responses on various topics. Share Denonymous links to collect text, images, videos, and audio anonymously. Authenticated users can access this dashboard to view, create, and manage their Denonymous settings",
  keywords: [
    "Denonymous",
    "anonymous messaging app",
    "response box",
    "custom responses",
    "dashboard",
    "authenticated users",
    "create Denonymous",
    "manage Denonymous",
    "share Denonymous",
    "receive responses",
    "text responses",
    "image responses",
    "video responses",
    "audio responses",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "https://denonymous.xyz/dashboard" },
};

export default function page() {
  return (
    <main>
      <section
        className={"  min-h-[100vh] pt-24 backgroundVector" }
      >
        <div className=" mb-10">
        <Suspense fallback={<LoadingSkeleton  className="w-full my-10 max-w-[200px] h-[30px] mx-auto" />}>
      
            <UsernameDisplay />

 </Suspense>
        </div>
        <CreateDenonymousClient />
        <h1 className="mx-auto w-fit text-white text-lg my-8 gradient_elements_text border-b border-b-[#f6d108]">My Denonyms</h1>

        <div className="pb-10 w-[90%] max-w-[1024px] mx-auto ">
       <Suspense fallback={[1,2,3].map((e)=>(<LoadingSkeleton key={e} className="w-full my-10 max-w-[545px] h-[300px] mx-auto" />))}>
            <Denonyms />
            
            </Suspense>
        </div>
      </section>{" "}
    </main>
  );
}
