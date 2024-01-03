import { denonymousType, userModelType } from "@/types"
import User from "../../schema/User"
import { passwordHasher } from "@/src/core/lib/hashers"

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
        const user = await User.findOne({email}) as userModelType
       let a= user.denonymous.filter((e)=> (e.topic == topic && !e.isDeleted)) 
       if(a.length > 0){
    throw new Error("A denonymous with this same topic already exists")

       }

     const link = `${process.env.baseURL}/r/${uuid}/${topic}`
    await User.updateOne({email},{$push:{denonymous:{topic,link,owner:email}}})
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



export const fetchAllDenonyms = async(UUID:string,topic:string)=>{
    const all = await User.findOne({UUID}) as userModelType;
    if(!all) return
    const Denonymous = all.denonymous.filter((e)=>(e.responsesViewState && e.topic==topic && !e.isDeleted)) 
    if(Denonymous.length == 0) return {}
    return Denonymous[0].replys
}