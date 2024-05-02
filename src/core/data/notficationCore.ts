export const signupwelocme ="Welcome you have created an account 🎉, you can now enjoy receiving anonymous messages from friends, family and even strangers, go on and create a new denonymous box"

export const categories = {auth:"Authenication", reply:"Someone sent a response " , subscription:"subscription",denonym:"A new denonymous was created 🌟",deleteDenonym:"A denonymous was just deleted 👋"}


export const replyNotification=(box:string,key:string,uname:string,id:number,owner:string)=>{
    
    return { data:`Someone just replied your ${box} denonymous 😄, check it out now  `
    ,link:process.env.baseURL+`/r/${uname}/${key}/${id}`,
    owner
 }
 }

 export const denonymousCreationNotification=(box:string,uname:string,id:number)=>{
    return{
        data:`'${box}' denonymous has been created, go to your dashboard and share it's link with everyone and let's see what responses people anonymously send in 🤫`,
        link:process.env.baseURL+"/dashboard#"+id,
    }
 }

 export const denonymousDeleteNotification=(box:string)=>{
    return{
        data:`'${box}' denonymous has just been deleted 😱, you can no longer recieve responses on it`,
    }
 }