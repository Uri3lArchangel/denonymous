import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cookieKey } from "./src/core/data/constants";
import { userDataJWTType } from "./types";

// Fetch user session via JWT cookie
const fetchUserViaJWT = async (cookie?: string): Promise<userDataJWTType | null> => {
  if (!cookie) return null;
  try {
    const res = await fetch(`${process.env.baseURL}/api/verifyJWT`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookie }),
      cache: "no-store", // ensures no caching
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookieObj = cookies().get(cookieKey);
  const session = await fetchUserViaJWT(cookieObj?.value);

  // 🚨 Not logged in → block protected routes
  if (!session && !path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // 🚨 Already logged in → prevent /auth/signin
  if (path.startsWith("/auth/signin") && session) {
    if (session.verified) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.redirect(new URL("/auth/verify-email", request.url));
  }

  // 🚨 Verified users should not access /auth/verify-email
  if (path.startsWith("/auth/verify-email") && session?.verified) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🚨 Unverified users should always be forced to verify
  if (!path.startsWith("/auth/verify-email") && session && !session.verified) {
    return NextResponse.redirect(new URL("/auth/verify-email", request.url));
  }

  // ✅ Default fallthrough → allow request
  return NextResponse.next();
}

// ✅ Define where middleware runs
export const config = {
  matcher: [
    "/auth/:path*",
    "/dashboard",
    "/r",
    "/settings",
    "/notifications",
  ],
};
