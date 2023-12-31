import {  createUser, findUserByEmailAndPassword } from "@/src/BE/DB/queries/auth/query";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { passwordHasher } from "./hashers";
import { connectMongoClient, disConnectMongoClient } from "@/src/BE/DB/conection";
import { userModelType } from "@/types";
import { setSessionCookie } from "./Cookie";
import { userDataTokenSign } from "./JWTFuctions";

export const nextAuthConfig:NextAuthOptions={
    providers:[
CredentialsProvider({
credentials:{
    email:{type:"email",placeholder:"abc...@gmail.com",label:"Email"},
    password:{type:"password",placeholder:"*************",label:"Password"}
},
async authorize(credentials) {
    if(!credentials || !credentials.email || !credentials.password) throw new Error("Invalid credentials");
    await connectMongoClient()
    const user = await findUserByEmailAndPassword(credentials.email,credentials.password);
    await disConnectMongoClient()
    if(user){
        const {password,...userWithoutPassword}= user
        const token = userDataTokenSign(user.email,user.UUID,user.isEmailVerified,user.isPremium)
        setSessionCookie(token)
        return userWithoutPassword as User
    }else{
         throw new Error("Incorrect email or password")
    }
},
})
,        GoogleProvider({
            clientId:process.env.googleProviderClientID!,
            clientSecret:process.env.googleProviderClientSecret!,
            
        })
    ],
    callbacks:{
    
        async signIn({account,profile}){

         try{
             if(account?.provider == "google" && profile && profile.email){
                
                await connectMongoClient()
                const newUser = await createUser(profile.email)
                const token = userDataTokenSign(newUser.email,newUser.UUID,newUser.isEmailVerified,newUser.isPremium)
                setSessionCookie(token)
                await disConnectMongoClient()
                return newUser
            }
            if(account?.provider == "credentials"){
               return true
            }
            return false}catch(err:any){
                const errorMessage = err.message as string
                if(errorMessage.includes("duplicate key error") && errorMessage.includes("email")){
                  throw new Error("This email is already registered, try signing in")
                }
            }
        },
      
    },
    secret:process.env.userDataTokenKey
    ,session:{
        strategy:"jwt",
        maxAge:2592000,
        
    }
}