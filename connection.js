import mongoose from "mongoose";


export const connectMongo = async () => {
  try{
    
    if(mongoose.connections.length >= 2){
    console.log("disconnecting")
    await mongoose.disconnect()
    console.log("disconnected")


    }
    if (!mongoose.connections[0].db) {
    console.log("connecting")
    const uri = process.env.mongourl;
    await mongoose.connect(uri);
    console.log("connected")

  }
  return ;}catch(err){
    console.log(err)
    throw new Error("Error In Network Connection|client")
  }
};



