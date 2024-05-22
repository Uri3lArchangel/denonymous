import { denonymousType, replyModelType, userModelType } from "@/types";
import User from "../../schema/User";
import { keygen, removeWhitespace } from "@/src/core/lib/helpers";
import { connectMongo } from "@/connection";
import { redirect } from "next/navigation";
import {
  categories,
  denonymousCreationNotification,
  denonymousDeleteNotification,
  replyNotification,
} from "@/src/core/data/notficationCore";
import {  revalidateTag } from "next/cache";
import crypto from "crypto";

export const createFirstDenonymous = async (
  email: string,
  topic: string,
  desc?: string
) => {
await connectMongo();

  const user = (await User.findOne({ email })) as userModelType;
  let a = user.denonymous.filter(
    (e) => e.topic == removeWhitespace(topic) && !e.isDeleted
  );
  if (a.length > 0) {
    return {
      type: "error",
      message: "A denonymous with this same topic already exists",
    };
  }
  const key = crypto.randomBytes(6).toString("hex");
  const link = `${process.env.baseURL}/r/${user.username}/${key}`;
  const aa = denonymousCreationNotification(
    topic,
    user.username,
    user.denonymous.length
  );
  await User.updateOne(
    { email },
    {
      $push: {
        denonymous: {
          key,
          topic: topic,
          link,
          responsesViewState:false,
          owner: email,
          description: desc,
        },
        notifications: {
          owner: user.username,
          category: categories.denonym,
          data: aa.data,
          link: aa.link,
        },
      },
    }
  );
  revalidateTag("notifications_fetch_tag");
  return { type: "success", message: "Denonymous Created" };
};




export const createDenonymous = async (
  email: string,
  topic: string,
  desc?: string
) => {
await connectMongo();

  const user = (await User.findOne({ email })) as userModelType;
  let a = user.denonymous.filter(
    (e) => e.topic == removeWhitespace(topic) && !e.isDeleted
  );
  if (a.length > 0) {
    return {
      type: "error",
      message: "A denonymous with this same topic already exists",
    };
  }
  const key = crypto.randomBytes(6).toString("hex");
  const link = `${process.env.baseURL}/r/${user.username}/${key}`;
  const aa = denonymousCreationNotification(
    topic,
    user.username,
    user.denonymous.length
  );
  await User.updateOne(
    { email },
    {
      $push: {
        denonymous: {
          key,
          topic: topic,
          link,
          owner: email,
          description: desc,
        },
        notifications: {
          owner: user.username,
          category: categories.denonym,
          data: aa.data,
          link: aa.link,
        },
      },
    }
  );
  revalidateTag("notifications_fetch_tag");
  return { type: "success", message: "Denonymous Created" };
};

export const sendRelpy = async (
  username: string,
  key: string,
  reply: replyModelType
) => {
await connectMongo();

  const updatedUser = await User.findOne({ username });
  if (updatedUser) {
    const denonymousIndex = updatedUser.denonymous.findIndex(
      (d: any) => d.key === key
    );
   
    if (denonymousIndex !== -1) {
     const d = updatedUser.denonymous[denonymousIndex] as denonymousType
     let valid =true
     for(let i =0;i<reply.media.length;i++){
      let mime =reply.media[i].mimeType
      if(d.isImageLimitOn && mime.includes("image") ){
        valid=false 
      }
      if(d.isVideoLimitOn && mime.includes("video") ){
        valid=false 


      }
      if(d.isAudioLimitOn && mime.includes("audio") ){
        valid=false 

      }
     }
   if(valid){   
    const d = updatedUser.denonymous[denonymousIndex] as denonymousType;
    d.replys.push({
        key:keygen(),
        text: reply.text,
        media:  reply.media,
        bookmarked: false,
        visible:d.responsesViewState
        
      });
      const a = replyNotification(
        updatedUser.denonymous[denonymousIndex].topic,
        updatedUser.denonymous[denonymousIndex].key,
        username,
        updatedUser.denonymous[denonymousIndex].replys.length - 1,
        username
      );
      updatedUser.notifications.push({
        category: categories.reply,
        data: a.data,
        link: a.link,
        owner: username,
      });
      await updatedUser.save(); // Save the updated document}
   }else{
    throw new Error("Action not allowed|client")
   }
  }
  }
  revalidateTag("notifications_fetch_tag");
};
export const denonymousViewStateChange = async (
  email: string,
  key: string
) => {
await connectMongo();

  const updatedUser = await User.findOne({ email });
  if (updatedUser) {
    const denonymousIndex = updatedUser.denonymous.findIndex(
      (d: any) => d.key === key
    );
    if (denonymousIndex !== -1) {
      updatedUser.denonymous[denonymousIndex].isActive =
        !updatedUser.denonymous[denonymousIndex].isActive;

      await updatedUser.save(); // Save the updated document
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const deleteDenonymousMediaBucketDB = async (email: string, key_: string) => {
await connectMongo();
  const updatedUser = await User.findOne({ email });

  if (updatedUser) {
    const denonymousIndex = updatedUser.denonymous.findIndex(
      (d: any) => d.key === key_
    );

    if (denonymousIndex != -1) {
      let r = updatedUser.denonymous[denonymousIndex].replys as replyModelType[];
        updatedUser.denonymous.splice(denonymousIndex, 1);
      await updatedUser.save(); // Save the updated document
      return r;
    } else {
      return
    }
  }
};


export const deleteDenonymousDB = async (email: string, key_: string) => {
    const updatedUser = await User.findOne({ email });
  
    if (updatedUser) {
      const denonymousIndex = updatedUser.denonymous.findIndex(
        (d: any) => d.key === key_
      );
  
      if (denonymousIndex != -1) {
        // updatedUser.denonymous.splice(denonymousIndex, 1);
        // await updatedUser.save(); // Save the updated document
      } else {
        return
      }
    }
  };

export const fetchAllDenonyms = async (email: string) => {
await connectMongo();

  const user = (await User.findOne({ email })) as userModelType | null;
  if (!user) redirect("/auth/signup");
  const denonyms = user.denonymous;
  return denonyms;
};

export const deleteAccountQuery = async (email: string) => {
await connectMongo();

  await User.deleteOne({ email });
};


export const changeResponsesVisibilityQuery = async(email:string,denonymousKey:string)=>{
await connectMongo();

  const user = await User.findOne({email}) 

  if(user){
    const denonymousIndex = user.denonymous.findIndex(
      (d: any) => d.key === denonymousKey
    );

    if (denonymousIndex != -1) {
      user.denonymous[denonymousIndex].replys.map((e:replyModelType)=>{
        e.visible = !e.visible
      })
      user.denonymous[denonymousIndex].responsesViewState = !user.denonymous[denonymousIndex].responsesViewState;
      console.log(user.denonymous[denonymousIndex].responsesViewState)
      await user.save(); // Save the updated document

    } 
  }
}

export const changeMediaSettingsQuery  = async(type:"image"|"video"|"audio",email:string,key:string)=>{
await connectMongo();

const user = await User.findOne({email})
if(user){
const index = user.denonymous.findIndex((e:any)=>e.key == key)

if(index != -1){
const denonymous = user.denonymous[index] as denonymousType;

if(type == "image"){
  denonymous.isImageLimitOn = !denonymous.isImageLimitOn;
}
if(type == "video"){
  denonymous.isVideoLimitOn = !denonymous.isVideoLimitOn;
}
if(type == "audio"){
  denonymous.isAudioLimitOn = !denonymous.isAudioLimitOn;
}

await user.save()
}

}
}