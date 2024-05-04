'use client'
import React, {  createContext } from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const NotificationContext = createContext<((notificationDataObject: NotificationDataObject) => void)| null >(null)

export type NotificationDataObject={type:NotificationType,message:string,description:string}
const NotificationApp = ({children}:{children:React.ReactNode}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (notificationDataObject:NotificationDataObject) => {
    api[notificationDataObject.type]({
      message: notificationDataObject.message,
      description:notificationDataObject.description,
        placement:'topLeft',
        className:"text-white",
        style:{backgroundColor:"#000",border:"1px solid #ffdf00",color:"white",borderRadius:"7px"},
    });
  };

  return (
    <NotificationContext.Provider value={(data:NotificationDataObject)=>{openNotificationWithIcon(data)}}>
      {contextHolder}
     {children}
    </NotificationContext.Provider >
  );
};

export default NotificationApp;
