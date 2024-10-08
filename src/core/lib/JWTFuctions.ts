import { userDataJWTType, userNotificationType } from '@/types'
import JWT from 'jsonwebtoken'

export const userDataTokenSign = (username:string,email:string,verified:boolean,premium:boolean)=>{
    const expiry=(Date.now()+(4))
    return JWT.sign({email,username,verified,premium,expiry},process.env.userDataTokenKey!+expiry)
}
export const verifyUserDataToken=(token:string)=>{
    if(!token){return}
    const {expiry} = (JWT.decode(token) as userDataJWTType)
    // if(Date.now()>Number(expiry)){return}

    const data = JWT.verify(token,process.env.userDataTokenKey!+expiry) as userDataJWTType | undefined 
    return data
}
export const decodeUserDataToken=(token:string)=>{
    const data = JWT.decode(token) as userDataJWTType
    return data
}

export const signKeyData=({...a})=>{
    a['timestamp']=Date.now()
const key = JWT.sign(a,process.env.keygenkey!)
return key
}

export const signPointsData = (points:number)=>{
    const token = JWT.sign({points},process.env.userDataTokenKey!)
    return token
}
export const verifyPointsData = (token:string)=>{
const {points} = JWT.verify(token,process.env.userDataTokenKey!) as {points:number}
return points
}