import { Schema, model, models } from "mongoose";

const UserSecSchema = new Schema({
  UUID: String,
  points: {type:Number,default:0},
  walletAddress: String,
  premiumEndDate: {type:Number,default:0},
  premiumDenonymousBoxes: [String],
});

let UserSec = models.UserSec || model("UserSec", UserSecSchema);

export default UserSec;
