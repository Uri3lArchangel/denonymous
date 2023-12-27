import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    UUID:String,
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
    
    username:String,

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        lowercase:true
    },

    isPremium:{
        type:Boolean,
        default:false
    },

    isEmailVerified:{
        type:Boolean,
        default:false
    },
    passworResetToken:String,
    denonymous:[{
        id:{type:Number,default:0},
        owner:String,
        link:String,
        topic:String,
        dateCreated:{
            type:Number,
            default:Date.now()
        },
        responsesViewState:{
            type:Boolean,
            default:true
        },
        isVideoLimitOn:{
            type:Boolean,
            default:false
        },
        isAudioLimitOn:{
            type:Boolean,
            default:false
        },
        isImageLimitOn:{
            type:Boolean,
            default:false
        },
        replys:[
            {
                text:String,
                imageAvailable:Boolean,
                images:[String],
                videoAvailable:Boolean,
                videos:[String],
                audioAvailable:Boolean,
                audios:[String],
                bookmarked:Boolean,
                
            }
            ]
    }]
})


let User = models.Users || model('Users',UserSchema)

export default User