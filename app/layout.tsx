import { Poppins } from "next/font/google";
import "@/public/styles/globals.css";
const Nav = dynamic(() => import("@/src/FE/components/Nav"));
const NotificationApp = dynamic(
  () => import("@/src/FE/components/contexts/NotificationContext")
);
import { SessionProvider } from "@/src/FE/components/hooks/SessionHook";
const GoogleAnalytics = dynamic(() => import("@/analytics/Google"));
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import Footer from "@/src/FE/components/subcomponents/Footer";
import { Metadata } from "next";

const inter = Poppins({ weight: ["500"], subsets: ["latin-ext"] ,preload:true});
export const metadata: Metadata = {


  assets:["https://denonymous.xyz/assets","https://denonymous.xyz/images","https://denonymous.xyz/styles"],
  
  

};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/_next/static/media/BACKG.7fdc6a86.avif" />
        <link rel="preload" as="image" href="/images/logo.avif" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="monetag" content="e0924cc3c8afcfe53d96ac784f0cd5c9" />
        <meta name="google-adsense-account" content="ca-pub-5897237172978966" />
        <Analytics />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        {/* <Tags />       */}
        <Nav />

        <NotificationApp>
          <SessionProvider>
            <div className="md:w-[100%] w-full  mx-auto">{children}</div>
          </SessionProvider>
        </NotificationApp>
        <Footer />
      </body>
    </html>
  );
}
