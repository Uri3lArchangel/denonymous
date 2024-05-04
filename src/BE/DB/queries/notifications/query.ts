import { userModelType } from "@/types";
import { fetchUsernameData } from "../auth/query";

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
