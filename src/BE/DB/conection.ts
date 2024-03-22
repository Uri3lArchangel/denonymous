import mongoose from "mongoose"
const uri = process.env.mongourl!

export const connectMongoClient = async()=>{
    console.log("connecting")

    await mongoose.connect(uri)
    console.log("connected")
    

}
