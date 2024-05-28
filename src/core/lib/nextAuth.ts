
import {  createUser, findUserByEmailAndPassword } from "@/src/BE/DB/queries/auth/query";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { setSessionCookie } from "./Cookie";
import { userDataTokenSign } from "./JWTFuctions";
import { revalidateTag } from "next/cache";

export const nextAuthConfig:NextAuthOptions={
    providers:[
   
CredentialsProvider({
credentials:{
    email:{type:"text",placeholder:"abc...@gmail.com or abc",label:"Email or username"},
    password:{type:"password",placeholder:"*************",label:"Password"}
},


async authorize(credentials) {
    if(!credentials || !credentials.email || !credentials.password) throw new Error("Invalid credentials");
    const user = await findUserByEmailAndPassword(credentials.email,credentials.password);
    if(user){
        const {password,...userWithoutPassword}= user
        const token = userDataTokenSign(user.username,user.email,user.UUID,user.isEmailVerified,user.isPremium)
        setSessionCookie(token)
        revalidateTag("nav_revalidate")
        return userWithoutPassword as User
    }else{
         throw new Error("Incorrect email or password")
    }
},
})
,        GoogleProvider({
            clientId:process.env.NODE_ENV == "production"?process.env.googleProviderClientID_prod!:process.env.googleProviderClientID!,
            clientSecret:process.env.NODE_ENV == "production"?process.env.googleProviderClientSecret_prod!:process.env.googleProviderClientSecret!,
            
        })
    ],
    callbacks:{
    
        async signIn({account,profile}){

         try{
             if(account?.provider == "google" && profile && profile.email){
                const newUser = await createUser(profile.name?profile.name.replaceAll(" ","_"):profile.email.split('@')[0],profile.email) 
                const token = userDataTokenSign(profile.name?profile.name.replaceAll(" ","_"):profile.email.split('@')[0],newUser.email,newUser.UUID,newUser.isEmailVerified,newUser.isPremium)
                setSessionCookie(token)

                return newUser
            }
            if(account?.provider == "credentials"){
               return true
            }
            return false
        
        }catch(err:any){
            console.log(err)
               return true
            }
        },
    
      
    },
    pages:{
        signIn:"/auth/signin"
    },
    session: { strategy: "jwt" },
   

}
