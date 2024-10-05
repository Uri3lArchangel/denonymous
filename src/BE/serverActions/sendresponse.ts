'use server'

import { connectMongo } from "@/connection"
import User from "../DB/schema/User"
import { u1, userModelType } from "@/types"
import UserSec from "../DB/schema/UserSecondary"


export const isPremiumCheck  = async(username:string,key_:string)=>{
    try{
        await connectMongo()
       const user =  await User.findOne({username}) as userModelType;
      const u1 = await UserSec.findOne({UUID:user.UUID}) as u1
      if(!u1){
        await UserSec.create({UUID:user.UUID})
      }
       const isDenonymousPremium = u1.premiumDenonymousBoxes.includes(key_)
       if(isDenonymousPremium || (user.isPremium && u1.premiumEndDate < Date.now())  ){
        return true
       }else {
        return false
       }
    
        
       
     

    }catch(err:any){
        return false
    }

}