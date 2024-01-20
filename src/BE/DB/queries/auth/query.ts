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
    

    export const createDenonymous = async(email:string,topic:string,uuid:string,desc?:string)=>{
        const user = await User.findOne({email}) as userModelType
       let a= user.denonymous.filter((e)=> (e.topic == topic && !e.isDeleted)) 
       if(a.length > 0){
    throw new Error("A denonymous with this same topic already exists")

       }

     const link = `${process.env.baseURL}/r/${user.username}/${topic}`
    await User.updateOne({email},{$push:{denonymous:{topic,link,owner:email,description:desc}}})
    }

export const createUser=async(username:string,email:string,password?:string)=>{
    if(password){
const user =await User.create({UUID:crypto.randomUUID(),email,password,username})
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

export const fetchUUIDData = async(UUID:string)=>{
    const all = await User.findOne({UUID}) as userModelType;
    if(!all) return
    return all
}

export const sendRelpy=async(username:string,topic:string,reply:replyModelType)=>{
        const updatedUser = await User.findOne({ username, "denonymous.topic": topic });
      
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
export const denonymousViewStateChange = async(UUID:string,topic:string)=>{
    const updatedUser = await User.findOne({ UUID, "denonymous.topic": topic });
      
    if (updatedUser) {
        const denonymousIndex = updatedUser.denonymous.findIndex(
          (d:any) => d.topic === topic
        );
    
        if (denonymousIndex !== -1) {
          updatedUser.denonymous[denonymousIndex].isActive = !updatedUser.denonymous[denonymousIndex].isActive;
    
          await updatedUser.save(); // Save the updated document
        }else{
            throw new Error("Something went wrong!")
        }
      }

}

export const deleteDenonymousDB = async(UUID:string,topic:string)=>{
  const updatedUser = await User.findOne({ UUID, "denonymous.topic": topic }) 
    console.log(updatedUser,"user",3)
  if (updatedUser) {
      const denonymousIndex = updatedUser.denonymous.findIndex(
        (d:any) => d.topic === topic
      );

  
      if (denonymousIndex !== -1) {
       let r= updatedUser.denonymous[denonymousIndex].replys as replyModelType[]
       
        updatedUser.denonymous.splice(denonymousIndex,1)
        await updatedUser.save(); // Save the updated document
        return r
      }else{
          throw new Error("Something went wrong!")
      }
    }

}