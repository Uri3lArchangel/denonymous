import mongoose from "mongoose"
const uri = process.env.mongourl!
export const connectMongoClient = async()=>{
    console.log("connecting")
    await mongoose.connect(uri)
    console.log("connected")

}
export const disConnectMongoClient = async()=>{
    console.log("disconnecting")
    await mongoose.disconnect()
    console.log("disconnected")

}