import { userDataJWTType, userNotificationType } from '@/types'
import JWT from 'jsonwebtoken'

export const userDataTokenSign = (username:string,email:string,uuid:string,verified:boolean,premium:boolean)=>{
    const randomKey=`${Math.random() * 10000}`
    return JWT.sign({email,username,uuid,verified,premium,randomKey},process.env.userDataTokenKey!+randomKey)
}
export const verifyUserDataToken=(token:string)=>{
    if(!token){return}
    const {randomKey} = (JWT.decode(token) as userDataJWTType)
    const data = JWT.verify(token,process.env.userDataTokenKey!+randomKey) as userDataJWTType | undefined 
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