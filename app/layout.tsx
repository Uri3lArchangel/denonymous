import { Poppins } from "next/font/google";
import "@/public/styles/globals.css";
import { SessionProvider } from "@/src/FE/components/hooks/SessionHook";
import Footer from "@/src/FE/components/subcomponents/Footer";
import { Metadata } from "next";
import GoogleAdsense from "@/ads/GoogleAdsense";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "@/src/FE/components/Nav";
import NotificationApp from "@/src/FE/components/contexts/NotificationContext";
import GoogleAnalytics from "@/analytics/Google";
import Hotjar from "@/analytics/Hotjar";
import MicrosoftAnalytics from "@/analytics/MicrosoftAnalytics";
import TagsAntiBlock from "@/ads/TagsAntiBlock";

const inter = Poppins({ weight: ["500"], subsets: ["latin-ext"] ,preload:true});
export const metadata: Metadata = {
  metadataBase: new URL('https://denonymous.xyz'),
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
        <link rel="preload" as="image" href="/images/logo.avif" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/images/spinner.gif" />
        <meta name="monetag" content="a6e917a5f88ffb0c1925488a39849857" />
        <meta name="google-adsense-account" content="ca-pub-5897237172978966" />
        <meta name="google-site-verification" content="O6ay580QXmHQ56C-TAYLnGBXardo6ak-gDm29W7w5T4" />
        <SpeedInsights/>
        <GoogleAnalytics />
        <GoogleAdsense />
        <MicrosoftAnalytics />
        <Hotjar />
      </head>
      <body className={inter.className}>
        {/* <TagsAntiBlock /> */}
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
