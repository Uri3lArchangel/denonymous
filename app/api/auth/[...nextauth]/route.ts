import { nextAuthConfig } from "@/src/core/lib/nextAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(nextAuthConfig)
export {handler as GET,handler as POST};
