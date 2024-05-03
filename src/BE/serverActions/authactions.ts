'use server'

import { userModelType } from "@/types"
import { changePasswordQuery, findUserByEmail, updateTokenData } from "../DB/queries/auth/query"
import { passwordReset } from "../email-service/nodemailer"

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
    const u= await updateTokenData(email) as userModelType
    return {type:"success",message:"Password reset link sent to "+email,time:u.token.nextRequestable}


}catch(err:any){
    return {type:"error",message:String(err)}
 
}
}


export const changePasswordAction =async(key:string,password:string)=>{
try{
    await changePasswordQuery(key,password)
    return "success"

}catch(err:any){
return err.message
}
}