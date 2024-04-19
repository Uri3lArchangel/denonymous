import {  replyModelType, userModelType } from "@/types"
import User from "../../schema/User"
import { removeWhitespace } from "@/src/core/lib/helpers"
import { connectMongo } from "@/connection"
import { redirect } from "next/navigation"
import { categories, denonymousCreationNotification, denonymousDeleteNotification, replyNotification } from "@/src/core/data/notficationCore"
import { revalidatePath, revalidateTag } from "next/cache"
connectMongo()
export const createDenonymous = async(email:string,topic:string,uuid:string,desc?:string)=>{

    const user = await User.findOne({email}) as userModelType
   let a= user.denonymous.filter((e)=> (e.topic == removeWhitespace(topic) && !e.isDeleted)) 
   if(a.length > 0){
throw new Error("A denonymous with this same topic already exists|client")

   }

 const link = `${process.env.baseURL}/r/${user.username}/${topic}`
 const aa = denonymousCreationNotification(topic,user.username,user.denonymous.length)
await User.updateOne({email},{$push:{denonymous:{topic:removeWhitespace(topic),link,owner:email,description:desc},notifications:{owner:user.username,category:categories.denonym,data:aa.data,link:aa.link}}})
revalidateTag("notifications_fetch_tag")

}


export const sendRelpy=async(username:string,topic:string,reply:replyModelType)=>{

        const updatedUser = await User.findOne({ username, "denonymous.topic": topic }) 
      
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
            const a =replyNotification(topic,username,updatedUser.denonymous[denonymousIndex].replys.length-1,username)
            updatedUser.notifications.push({
              category:categories.reply,data:a.data,link:a.link,owner:a.owner
            })
            await updatedUser.save(); // Save the updated document
          }
        }
        revalidateTag("notifications_fetch_tag")
    
      
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
  if (updatedUser) {
      const denonymousIndex = updatedUser.denonymous.findIndex(
        (d:any) => d.topic === topic
      );

  
      if (denonymousIndex !== -1) {
       let r= updatedUser.denonymous[denonymousIndex].replys as replyModelType[]
       
        updatedUser.denonymous.splice(denonymousIndex,1)
        const a = denonymousDeleteNotification(topic)
        updatedUser.notifications.push({
          category:categories.deleteDenonym,data:a.data,owner:updatedUser.username
        })
        await updatedUser.save(); // Save the updated document
        return r
      }else{
          throw new Error("Something went wrong!")
      }
    }

}


export const fetchAllDenonyms=async(email:string)=>{ 
  const user = await User.findOne({email}) as userModelType | null
  if(!user)redirect("/auth/signup")
  const denonyms = user.denonymous
  return denonyms
}

export const deleteAccountQuery = async(email:string)=>{
  
  await User.deleteOne({email})
  
}