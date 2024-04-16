'use server'
import { revalidateTag } from "next/cache"
import { updateNotificationOpenedStateQuery } from "../DB/queries/notifications/query"

export const updateNotificationAction=async(id:number,owner:string)=>
{
 await updateNotificationOpenedStateQuery(id,owner)
 revalidateTag("notifications_fetch_tag")
}