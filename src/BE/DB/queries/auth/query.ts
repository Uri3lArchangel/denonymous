import { denonymousType, replyModelType, userModelType } from "@/types"
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



export const fetchUUIDData = async(UUID:string)=>{
    const all = await User.findOne({UUID}) as userModelType;
    if(!all) return
    return all
}

export const sendRelpy=async(UUID:string,topic:string,reply:replyModelType)=>{
        const updatedUser = await User.findOne({ UUID, "denonymous.topic": topic });
      
        if (updatedUser) {
          const denonymousIndex = updatedUser.denonymous.findIndex(
            (d:any) => d.topic === topic
          );
      
          if (denonymousIndex !== -1) {
            updatedUser.denonymous[denonymousIndex].replys.push({
              text: reply.text,
              media: reply.media,
              bookmarked: false,
            });
      
            await updatedUser.save(); // Save the updated document
          }
        }
    
      
}
