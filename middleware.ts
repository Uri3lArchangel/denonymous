import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { userDataJWTType, userModelType } from './types'
import { cookieKey } from './src/core/data/constants'


const fetchUserViaJWT=async(cookie:any)=>{
   try{ 
    
    if(!cookie) return null
    const res = await fetch(process.env.baseURL+"/api/verifyJWT",{method:"POST",body:JSON.stringify({cookie:cookie.value}),mode:"no-cors",next:{revalidate:0}})

    return (await res.json()).user as userDataJWTType | null}
    catch(err:any){
        console.log(err.message)
    }
}

export async function middleware(request: NextRequest) {
  
   try{ 
    // if(request.nextUrl.pathname.includes("subscription")){
    //     console.log({middle:request.headers.get("x-forwarded-for")})
    //   }
    let cookie;
    const cookieObj = cookies().get(cookieKey)
    if(cookieObj){
        cookie = cookieObj.value
    }

    const session =await fetchUserViaJWT(cookieObj)
    
    if(!session && (!request.nextUrl.pathname.includes("/auth"))){
        return NextResponse.redirect(new URL("/auth/signin",request.nextUrl))
    }
  if(request.nextUrl.pathname.includes("/auth/signin") && session){
    if(session.verified){
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }else{
        return NextResponse.redirect(new URL("/auth/verify-email",request.nextUrl))

    }
  }

  if(session){

    if(request.nextUrl.pathname.includes("verify-email")){
        if(session.verified){
            return NextResponse.redirect(new URL("/",request.nextUrl))
        }
        if(!session.verified){
            const res = await fetch(process.env.baseURL+"/api/auth/updateVerification",{method:"POST",body:JSON.stringify({cookie})})   
        }
      }
      if( !request.nextUrl.pathname.includes("verify-email") ){
        if(!session.verified){
         
            return NextResponse.redirect(new URL("/auth/verify-email",request.nextUrl))
    
        }
     
      }
  }

  
  return NextResponse.next()
}catch(err:any){
    throw new Error(err.message)
}
}
 
export const config = {
    matcher: ["/auth/:path+","/dashboard","/r","/settings","/notifications"],
}