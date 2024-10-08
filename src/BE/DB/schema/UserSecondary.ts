import { Schema, model, models } from "mongoose";

const UserSecSchema = new Schema({
  username: {type:String,required:true,unique:true},
  points: {type:Number,default:0},
  walletAddress: String,
  premiumEndDate: {type:Number,default:0},
  premiumDenonymousBoxes: {type:[String],default:[]},
});

let UserSec = models.UserSec || model("UserSec", UserSecSchema);

export default UserSec;
