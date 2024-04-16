import mongoose from "mongoose";


export const connectMongo = async () => {
  if (!mongoose.connections[0].db) {
    console.log("connecting")
    const uri = process.env.mongourl;
    await mongoose.connect(uri);
    console.log("connected")

  }
  return ;
};



