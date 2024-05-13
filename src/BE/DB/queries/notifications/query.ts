import { userModelType } from "@/types";
import { fetchUsernameData } from "../auth/query";
import User from "../../schema/User";

export const updateNotificationOpenedStateQuery = async (
    id: number,
  uname: string
  
) => {
  try {
    const user = await fetchUsernameData(uname);
console.log({user})
    if (user) {
      user.notifications[id].opened = true;
      await user.save();
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const markAllAsReadQuery = async(email:string)=>{
const user = await User.findOne({email}) 
if(user){
 const len = user.notifications.length
 for(let i=0;i<len;i++){
  user.notifications[i].opened=true
 }
 await user.save()
}
}
