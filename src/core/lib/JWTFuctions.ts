import { userDataJWTType } from '@/types'
import JWT from 'jsonwebtoken'

export const userDataTokenSign = (email:string,uuid:string,verified:boolean,premium:boolean)=>{
    const randomKey=`${Math.random() * 10000}`
    return JWT.sign({email,uuid,verified,premium,randomKey},process.env.userDataTokenKey!+randomKey)
}
export const verifyUserDataToken=(token:string)=>{
    const {randomKey} = (JWT.decode(token) as userDataJWTType)
    const data = JWT.verify(token,process.env.userDataTokenKey!+randomKey) as userDataJWTType | undefined 
    return data
}
export const decodeUserDataToken=(token:string)=>{
    const data = JWT.decode(token) as userDataJWTType
    return data
}