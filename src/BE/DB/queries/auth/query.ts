import { denonymousType, replyModelType, userModelType } from "@/types"
import User from "../../schema/User"
import { passwordHasher } from "@/src/core/lib/hashers"
import crypto from 'crypto'
import { code_generator } from "@/src/core/lib/helpers"
import { connectMongo } from "@/connection"
import { categories, signupwelocme } from "@/src/core/data/notficationCore"

connectMongo()

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
  value:code_generator(),
  expires:Date.now()+(30*60*1000),
  nextRequestable:0
},
notifications:[{category:categories.auth,data:signupwelocme,opened:false,owner:username}]
})
return user 
    }else{
        let user = User.findOne({email})
        if(user) return user
 user =await User.create({UUID:crypto.randomUUID(),email,isEmailVerified:true,username})
return user 

    }
}
export const setResetVerificationCodeDB=async(email:string,code:string)=>{
 const data =await  User.findOne({email})
 if(data.token.nextRequestable > 0){
  return
 }
  await User.updateOne({email},{"token.value":code,"token.expires":Date.now()+(30 * 60 * 1000),"token.nextRequestable":Date.now()+(2 * 60 * 1000)})
}

export const updateUserEmailStatusByToken=async(token:string)=>{
try{  
  const user = await User.findOne({"token.value":token}) as userModelType
   if(!user){
    return {type:"error",message:"Invalid code"}
  }
  if(user.token.expires <= Date.now()){
    return {type:"warning",message:"Token expired"}
  }
 
    await User.updateOne({"token.value":token},{isEmailVerified:true,email:user.email,"token.value":null,"token.expires":null,"token.nextRequestable":0});
  const user0 = await User.findOne({email:user.email}) as userModelType

    return {type:"success",message:"Verification successful",data:user0}
  }catch(err:any){
    console.log(err)
    return {type:"error",message:"An error occured"}

    }
}

export const fetchUsernameData = async(username:string)=>{
  
  const user = await User.findOne({username}) 

  return user
}


export const changeEmailQuery=async(email:string,newEmail:string)=>{

  await User.updateOne({ email },{email:newEmail}) 
 
}

export const updateTokenData=async(email:string)=>{

  let updated = await User.updateOne({email},{"token.value":code_generator(),"token.expires":Date.now()+(30 * 60 * 1000),"token.nextRequestable":Date.now()+(120*1000)})

return await findUserByEmail(email)

}

export const changePasswordQuery = async(token:string,password:string)=>{
  const hash = passwordHasher(password)
  await User.updateOne({"token.value":token},{password:hash,"token.value":null,"token.expires":0,"token.nextRequestable":0})
  return 
}

export const checkIfTokenIsValid = async(token:string)=>{
  const user = await User.findOne({"token.value":token}) as userModelType
  if(!user){
    return 'Invalid reset token'
  }
  if(user.token.expires <= Date.now()){
    return 'Token has expired'
  }
  return null
}


export const resetVerificationToken = async(email:string)=>{
  const token = Math.ceil((Math.random()*1000000))
  const u =await User.findOne({email}) as userModelType;
  if(u.token.nextRequestable >= Date.now()){
    return {type:"warning",message:"cool down period is no yet up, please wait",data:u}
  }
   await User.updateOne({email},{'token.value':token,"token.expires":Date.now()+(30*60*1000),"token.nextRequestable":Date.now()+(2*60*1000)}) ;
const user = await User.findOne({email}) 

   return {type:"success",message:"",data:user}
  
}


export const changeEmail = async(email:string,newEmail:string)=>{
 await User.updateOne({email},{email:newEmail})
  
}



export const changeUsernameViaUsername = async(username:string,newUsername:string)=>{
await User.updateOne({username},{username:newUsername})
}

export const getCodeTimerCountdown = async(email:string)=>{
        const user = await User.findOne({email})
        if(user.token.nextRequestable <= 0){
          return
        }else{
          return user.token.nextRequestable 
        }
}

export const changePasswordViaPassword = async(password:string,newPassword:string)=>{
  const user = await User.findOne({password})
  if(!user) return {message:"incorrect password",type:"error"}
  await User.updateOne({password},{password:newPassword})
  return {message:"Password Changed",type:"success"}
}
