import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";

const inter = Poppins({ weight:["500"],subsets:["latin-ext"] });

export const metadata: Metadata = {
  title: "Denonymous",
  description: "Anonymous messaging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="min-h-[80px] bg-gray-500 md:hidden pb-10">ads</div>
        <div className="hidden md:block absolute top-[0] left-0 h-[100%] w-[12%] bg-white">ads</div>
        <div className="hidden md:block absolute top-[0] right-0 h-[100%] w-[12%] bg-white">ads</div>
      <EdgeStoreProvider>
       <div className="md:w-[70%] w-full mx-auto">{children}</div> 
        </EdgeStoreProvider>        
      </body>
    </html>
  );
}
