'use server'
import { denonymousType, replyModelType, userModelType } from "@/types"
import User from "../../schema/User"

export const createDenonymous = async(email:string,topic:string,uuid:string,desc?:string)=>{

    const user = await User.findOne({email}) as userModelType
   let a= user.denonymous.filter((e)=> (e.topic == topic && !e.isDeleted)) 
   if(a.length > 0){
throw new Error("A denonymous with this same topic already exists|client")

   }

 const link = `${process.env.baseURL}/r/${user.username}/${topic}`
await User.updateOne({email},{$push:{denonymous:{topic,link,owner:email,description:desc}}})
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
      console.log({topic,UUID})
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
