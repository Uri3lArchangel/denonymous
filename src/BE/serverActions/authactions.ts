'use server'

import { userModelType } from "@/types"
import { findUserByEmail, updateTokenData } from "../DB/queries/auth/query"
import { passwordReset } from "../email-service/nodemailer"
import { calculateStrength } from "@/src/core/lib/helpers"

export const sendResetLink = async(prev:any,e:FormData)=>{
try{
    const email= e.get('email_change') as string

    if(!email){
        return {type:"error",message:"Provide an email address"}
    }
    const user = await findUserByEmail(email) as userModelType
    if(!user){
        return {type:"error",message:"No records with this email"}
    }
    if(user.token.nextRequestable > Date.now()){
        return {type:"warning",message:'Please wait for the cooldown period ',time:user.token.nextRequestable}
    }

    await passwordReset(email,user.token.value)
   const u= await updateTokenData(email) as userModelType
    return {type:"success",message:"Password reset link sent to "+email,time:u.token.nextRequestable}


}catch(err:any){
    return {type:"error",message:String(err)}
 
}
}


export const changePassword =async(prev:any,e:FormData)=>{
try{
    const password = e.get('password') as string
    const conf = e.get('confirmPassword') as string

    if(calculateStrength(password) < 3 || conf != password){
        return 
    }

    
}catch(err:any){

}
}