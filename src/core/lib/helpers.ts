import { baseUrl } from "../extras/globalData"

export const URLRESOLVE =(a:string)=>{
if(process.env.NODE_ENV =="production"){
    return baseUrl+a
}else{
    return a
}
}