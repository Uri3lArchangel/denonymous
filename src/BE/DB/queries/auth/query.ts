import { userModelType } from "@/types"
import User from "../../schema/User"
import { passwordHasher } from "@/src/core/lib/hashers"
import { baseUrl } from "@/src/core/extras/globalData"

export const findUserByEmail = async(email:string)=>{
try{const user = await User.findOne({email})
return user
}
catch(err:any){
    console.log(err)
}
}


export const findUserByEmailAndPassword = async(email:string,password:string)=>{
    try{
        const hash = passwordHasher(password)
        const user = await User.findOne({email,password:hash})
    return user
    }
    catch(err:any){
        console.log(err)
        return null
    }
    }
    

    export const createDenonymous = async(email:string,topic:string,uuid:string)=>{
        const id = parseInt(`${Math.random() *100000}`)
        const link = `${baseUrl}/d/${uuid}/${topic}_${id}`
    await User.updateOne({email},{$push:{denonymous:{id,topic,link,owner:email}}})
    }

export const createUser=async(email:string,password?:string)=>{
    if(password){
const user =await User.create({UUID:crypto.randomUUID(),email,password})
return user 
    }else{
        let user = User.findOne({email})
        if(user) return user
 user =await User.create({UUID:crypto.randomUUID(),email,isEmailVerified:true})
return user 

    }
}

export const updateUserEmailStatusByUUID=async(UUID:string)=>{
    await User.updateOne({UUID},{isEmailVerified:true});
    const user =await User.findOne({UUID})
    return user
}

