import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Nav from "@/src/FE/components/Nav";
import NotificationApp from "@/src/FE/components/contexts/NotificationContext";

const inter = Poppins({ weight:["500"],subsets:["latin-ext"] });

export const metadata: Metadata = {
  title: "Denonymous",
  description: "Anonymous messaging platform",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="min-h-[80px] bg-gray-500 md:hidden pb-10">ads</div>
      <EdgeStoreProvider>
        <NotificationApp >
        <Nav />
       <div className="md:w-[70%] w-full  mx-auto " >
        {children}
        </div> 
        </NotificationApp>
        </EdgeStoreProvider>        
      </body>
    </html>
  );
}
