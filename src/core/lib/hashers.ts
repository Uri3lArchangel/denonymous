import crypto from 'crypto'

export const passwordHasher=(password:string)=>{
    const passSalt =process.env.passwordSalt 
   const digest= crypto.createHash("sha512").update(passSalt+password+passSalt).digest("hex")
   return digest;
}