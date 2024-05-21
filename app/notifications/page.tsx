import { fetchNotficationsServer } from "@/src/BE/functions";
import LoadingSkeleton from "@/src/FE/components/assets/LoadingSkeleton";
const NotificationDetailLink = dynamic(
  () => import("@/src/FE/components/subcomponents/NotificationDetailLink"),
  { ssr: true ,loading(loadingProps) {
    return (<LoadingSkeleton className="h-[400px] w-full max-w-[600px]"  />)
  },}
);
import { flipIndex } from "@/src/core/lib/helpers";
import { Metadata } from "next";
import { revalidateTag } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
import MarkAsRead from "./MarkAsRead";

export const metadata: Metadata = {
  title: "Notifications | Denonymous",
  description:
    "Receive real-time updates on Denonymous responses here. Unauthenticated users can receive notifications for text, image, video, and audio responses. Authenticated users, as creators of the Denonymous, can monitor all responses but cannot respond from this page. Other authenticated users can both receive and view responses if enabled by the author",
  keywords: [
    "Denonymous",
    "anonymous messaging app",
    "notification center",
    "text responses",
    "image responses",
    "video responses",
    "audio responses",
    "real-time updates",
    "authenticated users",
    "unauthenticated users",
    "response monitoring",
  ],
  alternates: {
    canonical: "https://denonymous.xyz/notifications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function page() {
  const nots = await fetchNotficationsServer();
  const newNots = nots.reverse();
  let length = newNots.length;

  revalidateTag("notifications_fetch_tag")
  return (
    <section className='backgroundVector bg-black py-10 h-screen "'>
      <header>
        <h1 className="my-6 text-white text-2xl sm:text-3xl text-center">
          Notifications({nots.length})
        </h1>
      </header>
    <MarkAsRead />
      <section className="w-[90%] h-[60vh] max-w-[600px] overflow-y-scroll mx-auto">
        {newNots.length > 0 ? (
          newNots.map((e, i) => (
            <article key={i}>
              <NotificationDetailLink
                i={flipIndex(i, length)}
                length={length}
                e={e}
              />
            </article>
          ))
        ) : (
          <h2 className="text-xl">No notifications</h2>
        )}
      </section>
    </section>
  );
}

export default page;
