import { denonymousType, replyModelType, userModelType } from "@/types"
import User from "../../schema/User"
import { passwordHasher } from "@/src/core/lib/hashers"
import crypto from 'crypto'

export const findUserByEmail = async(email:string)=>{
try{
  const user = await User.findOne({email})
return user
}
catch(err:any){
    console.log(err)
}
}


export const findUserByEmailAndPassword = async(email:string,password:string)=>{
    try{

      const hash = passwordHasher(password)

      let user =await User.findOne({username:email,password:hash})
      if(user) return user
      user = await User.findOne({email,password:hash})
    return user
    }
    catch(err:any){
        console.log(err)
        return null
    }
    }
    



export const createUser=async(username:string,email:string,password?:string)=>{

    if(password){
     const token = crypto.randomBytes(102).toString('hex')
const user =await User.create({UUID:crypto.randomUUID(),email,password,username,token:{
  value:token,
  requestCount:0,
  nextRequestable:0
}})
return user 
    }else{
        let user = User.findOne({email})
        if(user) return user
 user =await User.create({UUID:crypto.randomUUID(),email,isEmailVerified:true,username})
return user 

    }
}

export const updateUserEmailStatusByUUID=async(UUID:string)=>{

    await User.updateOne({UUID},{isEmailVerified:true});
    const user =await User.findOne({UUID})
    return user
}

export const fetchUsernameData = async(username:string)=>{

  const all = await User.findOne({username}) as userModelType;
  if(!all) return
  return all
}


export const changeEmailQuery=async(email:string,newEmail:string)=>{

  await User.updateOne({ email },{email:newEmail}) 
 
}

export const updateTokenData=async(email:string)=>{

let updated = await User.updateOne({email},{$inc:{"token.requestCount":1},"token.nextRequestable":Date.now()+(120*1000)})

return await findUserByEmail(email)

}

export const changePassword = async()=>{
  
}