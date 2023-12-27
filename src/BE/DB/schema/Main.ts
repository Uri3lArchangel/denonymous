import { Schema } from "mongoose";

const MainSchema =new Schema({
   usersCount:{
      type:Number,
      default:0
   },
   denonymousCount:{type:Number,default:0},
   demoTesting:{type:Boolean,default:true}
})