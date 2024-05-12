import { denonymousType, userModelType, userNotificationType } from "@/types"
import crypto from 'crypto'

export const keygen = ()=>{
  return crypto.randomBytes(10).toString('hex')
}

export const URLRESOLVE =(a:string)=>{
if(process.env.NODE_ENV =="production"){
    return window.location.origin+a
}else{
    return a
}
}
export const filterDenonymous=(all:userModelType,key:string)=>{
    if(!all) throw new Error("This denonymous does not exist or has been deleted|client")
    if(!all.denonymous) throw new Error("This denonymous does not exist or has been deleted|client")

    const Denonymous = all.denonymous.filter((e)=>(e.key==key && !e.isDeleted)) 
    if(Denonymous.length == 0)  throw new Error("This denonymous does not exist or has been deleted|client")
    return Denonymous[0]
}

export const filterReplys=(all:userModelType,key:string)=>{
    if(!all) throw Error("Invalid parameters")
    if(!all.denonymous) return {}
    const Denonymous = all.denonymous.filter((e)=>( e.key==key && !e.isDeleted)) 
    if(Denonymous.length == 0) return []

    return Denonymous[0].replys
}
export const filterMediaLimitOn = (denonyms:denonymousType[],key:string)=>{

    const Denonymous = denonyms.filter((e)=>(e.key==key && !e.isDeleted)) 
    const status = {audio:Denonymous[0].isAudioLimitOn ,video:Denonymous[0].isVideoLimitOn, image:Denonymous[0].isImageLimitOn}
    return status
}

// export const screenshot=async()=>{}

export const downloadFile = async(a:string,type:string,ext:string)=>{
  
    let link =document.createElement("a") as HTMLAnchorElement;
        link.href=a;
        link.download = `${type}_${(Math.random()*1000).toFixed(0)}.${ext}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
}
export const downloadMedia=async(src:string)=>{
    const response = await fetch(src);
    const blob =await response.blob()
          // Create a download link
          var downloadLink = document.createElement("a");
    
          // Create a Blob URL for the audio file
          var blobUrl = URL.createObjectURL(blob);

          downloadLink.href = blobUrl;
          let s =src.split(".")
          downloadLink.download = `denonymous_media_${(Math.random()*1000).toFixed(0)}.${s[s.length -1]}`;

          document.body.appendChild(downloadLink);

          downloadLink.click();

          document.body.removeChild(downloadLink);
          
          URL.revokeObjectURL(blobUrl);
  }
  export const generateAndSendResetEmailLink=(email:string)=>{
    const hash = crypto.createHash('SHA256').update(process.env.resetSalt+email+process.env.resetSalt+Date.now()).digest('hex')
    return hash
    }
    

    export function validateEmail(email: string): { status: "error"|"success" } {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
     
    
        if (!emailRegex.test(email)) {
            return { status: "error"};
        }
    
        return { status: "success" };
    }
    


export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};


export const calculateStrength = (pass: string) => {
    let score = 0;

    // Check for length
    if (pass.length>0) {

      score += 1;
    }
    if (pass.length >= 8 ) {
      score += 1;
    }

    // Check for lowercase and uppercase letters
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      score += 1;
    }

    // Check for digits
    if (/\d/.test(pass)) {
      score += 1;
    }

    // Check for special characters
    if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(pass)) {
      score += 1;
    }

    return score;
  };

  export function removeWhitespace(str: string): string {
    return str.trim();
}





export function code_generator() {
  let randomString = '';
  
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    randomString += randomDigit;
  }

  // If the generated string has less than 6 digits, pad it with zeros
  while (randomString.length < 6) {
    randomString = '0' + randomString;
  }

  return randomString;
}


export const notificationDataTraucate = (a:string)=>{
if(a.length >= 50){
  
a = a.substring(0,50)
a= a+"...."
return a
}
}
export const largeNumbersTrauncate=(a:number | string )=>{
  if(typeof a == "number"){
    if(a > 99){
      return String(a+"+")
    }else{
      return String(a)
    }
    
  }else if(typeof a == "string"){
      let n = parseInt(a)
      if(n > 99){

        return String(n+"+")
      }else{
      return  String(a)
      }
    }else{
      return "0"
    }
  
}

export const fetchNotificationsClient = async()=>{

  const res = await fetch(URLRESOLVE("/api/fetchUserNav"),{next:{tags:['notifications_fetch_tag'],revalidate:false}})
  const data = await res.json()

 const a = (data.data.notifications.filter((e:any)=>!e.opened)).length
 return a as number
}

export const isActiveLink= ()=>{
  let a = document.getElementById("home_link") as HTMLAnchorElement;
  let b = document.getElementById("dashboard_link") as HTMLAnchorElement;
  a.classList.remove('gradient_elements_text')
  b.classList.remove('gradient_elements_text')


  if( window.location.pathname== "/")
  {
    a.classList.add("gradient_elements_text")
  }
  if(window.location.pathname.includes("dashboard")){
    b.classList.add("gradient_elements_text")

  }
 }
 export const validateUsername = (e:string)=>{
  if(e.match(/(\W)/g)){
    return false;
  }else{ 
    return true;
  }
 }


 export const flipIndex = (b:number,length:number)=>{
  const newIndex = Array.from({length},(_,i)=>(length-(i+1)))
  return newIndex[b]
}

export const copyToClipboard = (a: string) => {
  navigator.clipboard.writeText(a);
};



export async function fetchUser(username:string) {
  const res = await fetch(process.env.baseURL+"/api/fetchUserByusername",{method:"POST",mode:"no-cors",body:JSON.stringify({username}),next:{revalidate:false,tags:["raieneidmie_00"]}})
  const data =await res.json()
  return data.user
}
