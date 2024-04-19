import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";
import Nav from "@/src/FE/components/Nav";
import NotificationApp from "@/src/FE/components/contexts/NotificationContext";
import logoWhite from '../public/images/denonlogowhite.svg'
import Image from "next/image";
import Link from "next/link";
import twitter from '../public/images/twitter.svg'
import insta from '../public/images/insta.svg'
import linkedin from '../public/images/linkedin.svg'
import medium from '../public/images/medium.svg'
import { SessionProvider } from "@/src/FE/components/hooks/SessionHook";
import GoogleAnalytics from "@/analytics/Google";
import Tags from "@/ads/Tags";
import { Analytics } from "@vercel/analytics/react"


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
      <head>
      <meta name="monetag" content="e0924cc3c8afcfe53d96ac784f0cd5c9" />
      <meta name="google-adsense-account" content="ca-pub-5897237172978966" />
      <Analytics/> 
      <GoogleAnalytics />
      </head>
      <body className={inter.className}>
      <Tags />      

      <EdgeStoreProvider>
        <NotificationApp >
          <SessionProvider>
          <Nav />

       <div className="md:w-[100%] w-full  mx-auto" >
        {children}
        </div> 
        <footer className="min-h-[30vh] bg-black text-white pt-10 px-4">
          <div className="max-w-[600px] mx-auto">
        <Image src={logoWhite} alt="denonymous" className="mt-4"/>
        <p className=' font-extralight my-4 text-sm sm:w-[60%]'>Denonymous: The No 1 platform for Sharing video, image, audio and text responses anonymously. Register with us, create a Denonymous, and share with others to receive responses on any topic today.</p>
        <ul className="flex space-x-4 my-4">
          <li>
            <Link href="#">
            <Image src={twitter} alt="twitter" />
            </Link>
          </li>
          <li>
          <Link href="#">

            <Image src={insta} alt="instagram" />
            </Link>
          </li>
          <li>
          <Link href="#">

            <Image src={linkedin} alt="linkedin" />
            </Link>
          </li>
          <li>
          <Link href="#">

            <Image src={medium} alt="medium" />
            </Link>
          </li>
        </ul>
          <Link href="/support" className="block mx-auto  w-fit  underline">Support</Link>
          <h4 className="text-sm text-bold text-center mt-4 border-t py-2  mx-auto">All Rights Reserved. Copyright © 2024.</h4>
          </div>
        </footer>
        </SessionProvider>
        </NotificationApp>
        </EdgeStoreProvider>        
      </body>
    </html>
  );
}
