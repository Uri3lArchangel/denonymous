import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserDataToken } from './src/core/lib/JWTFuctions'
import { cookies } from 'next/headers'
import { userDataJWTType } from './types'
 
const fetchUserViaJWT=async(cookie:any)=>{
   try{ if(!cookie) return null
    const res = await fetch(process.env.baseURL+"/api/verifyJWT",{method:"POST",body:JSON.stringify({cookie:cookie.value}),mode:"no-cors",next:{revalidate:2}})

    return (await res.json()).user as userDataJWTType | null}
    catch(err:any){
        console.log(err.message)
    }
}

export async function middleware(request: NextRequest) {
    const session =await fetchUserViaJWT(request.cookies.get("denon_session_0"))
    if(!session && !request.nextUrl.pathname.includes("/auth/signin")){
        return NextResponse.redirect(new URL("/auth/signin",request.nextUrl))
    }

//   if(request.nextUrl.pathname.includes("/auth/signin")){
//     if(session.verified){
//         return NextResponse.redirect(new URL("/",request.nextUrl))
//     }else{
//         return NextResponse.redirect(new URL("/auth/verify-email",request.nextUrl))

//     }
//   }
//   if(request.nextUrl.pathname.includes("verify-email")){
//     if(session.verified){
//         return NextResponse.redirect(new URL("/",request.nextUrl))
//     }
//   }
  return NextResponse.next()

}
 
export const config = {
    matcher: ['/',"/auth/:path"],
}