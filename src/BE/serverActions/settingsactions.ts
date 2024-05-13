'use server'

import { changeEmail, changeEmailQuery, changePasswordViaPassword, changeUsernameViaUsername, fetchUsernameData, findUserByEmail, setResetVerificationCodeDB, updateUserEmailStatusByToken } from "../DB/queries/auth/query"
import { userDataTokenSign, verifyUserDataToken } from "@/src/core/lib/JWTFuctions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { deleteSessionCookie, setSessionCookie } from "@/src/core/lib/Cookie"
import { revalidatePath } from "next/cache"
import { code_generator, filterDenonymous } from "@/src/core/lib/helpers"
import { signUpConfirmation } from "../email-service/nodemailer"
import { passwordHasher } from "@/src/core/lib/hashers"
import { deleteDenonymousAction } from "./actions"
import { deleteAccountQuery, fetchAllDenonyms } from "../DB/queries/denonymous/query"

export const changeUsernameAction = async(e:FormData)=>{
try{

    const username_ = e.get("uname") as string
    const newUsername = e.get("uname-input") as string
  


const user = await fetchUsernameData(newUsername)
if(user){

    return {message:"This username is taken",type:"warning"}
}

await changeUsernameViaUsername(username_,newUsername)

    
    
  
    const cookie = cookies().get("denon_session_0")
    if(!cookie) {
        redirect("/auth/signin")
        
    }
    const oldUserdata = verifyUserDataToken(cookie.value)
    if(!oldUserdata){
        redirect("/auth/signin")
        
    }
    const  {email,username,...unchanged} = oldUserdata
    const token = userDataTokenSign(newUsername,email,unchanged.uuid,unchanged.verified,unchanged.premium)
    setSessionCookie(token)

    revalidatePath("/settings")
    return {message:"Change saved",type:"success"}


}catch(err:any){
    console.log(err)

    return {message:"An error occured",type:"error"}

}

}

export const changeEmailActionWithoutRediirect = async(e:FormData)=>{
    try{

        const cookie = cookies().get("denon_session_0")
    
        if(!cookie) {
            redirect("/auth/signin")
            
        }
        const oldUserdata = verifyUserDataToken(cookie.value)
        if(!oldUserdata){
            redirect("/auth/signin")
            
        }
        const email_ = e.get("email") as string
        const newEmail = e.get("newEmail") as string
    
  
        
            const user = await findUserByEmail(newEmail)

        if(user){
            return {message:"This email address is taken",type:"warning"}
        }
        const code =String(code_generator())
        await setResetVerificationCodeDB(email_,code)
        await changeEmail(email_,newEmail)
        await signUpConfirmation(newEmail,code)
      
        const newToken = userDataTokenSign(oldUserdata.username,newEmail,oldUserdata.uuid,false,oldUserdata.premium)
        setSessionCookie(newToken)
        revalidatePath("/verify-email")

return {message:"Email changed",type:"success"}

    }catch(err:any){
        console.log(err)

        return {message:"An error occured",type:"error"}
    
    }
    
    }

    export const changeEmailAction = async(e:FormData)=>{
        try{
            const cookie = cookies().get("denon_session_0")
        
            if(!cookie) {
                redirect("/auth/signin")
                
            }
            const oldUserdata = verifyUserDataToken(cookie.value)
            if(!oldUserdata){
                redirect("/auth/signin")
                
            }
            const email_ = e.get("email") as string
            const newEmail = e.get("newEmail") as string
        
      
            
                const user = await findUserByEmail(newEmail)
    
            if(user){
                return {message:"This email address is taken",type:"warning"}
            }
            const code =String(code_generator())
            await setResetVerificationCodeDB(email_,code)
            await changeEmail(email_,newEmail)
            await signUpConfirmation(newEmail,code)
          
            const newToken = userDataTokenSign(oldUserdata.username,newEmail,oldUserdata.uuid,false,oldUserdata.premium)
            setSessionCookie(newToken)
            redirect("/auth/verify-email")

        }catch(err:any){
            console.log(err)
        
            return {message:"An error occured",type:"error"}
        
        }
        
        }
export const verifyEmailAction=async(code:string)=>{
    try {
       const r=  await updateUserEmailStatusByToken(code)
       const user = r.data
       if(!user)return { message:"Invalid Code",type:"error" }
        const token  = userDataTokenSign(user.username,user.email,user.UUID,user.isEmailVerified,user.isPremium)

        setSessionCookie(token)
        return{
            message:"Email address verified",type:"success"
        }
    } catch (err:any) {
        return{
            message:"An error occured when verifying your email",type:"error"
        }
    }
}

export const changePasswordAction = async(e:FormData)=>{
    const current = e.get("current-password") as string
    const newPassword = e.get("new-password") as string
    console.log(current)
    const currentHash = passwordHasher(current)
    const newHash = passwordHasher(newPassword)
   const r=  await changePasswordViaPassword(currentHash,newHash)
   
   return r
}

export const deleteAccountAction=async()=>{
   const cookie = cookies().get("denon_session_0")
   if(!cookie || !cookie.value)redirect("/auth/signin")
   let user = verifyUserDataToken(cookie.value)
if(!user)redirect("/auth/signin")
    const denonyms = await fetchAllDenonyms(user.email)
console.log({denonyms})
let urls:string[]|undefined=[]
    for(let i=0;i<denonyms.length;i++){
await deleteDenonymousAction(denonyms[i].key)
        
    }
    await deleteAccountQuery(user.email)
    deleteSessionCookie()
   return urls
}


