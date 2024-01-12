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
      <EdgeStoreProvider>{children}</EdgeStoreProvider>        
      </body>
    </html>
  );
}
