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
        owner:String,
        isDeleted:{type:Boolean,default:false},
        isActive: {type:Boolean,default:false},
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
                text:{type:String,default:""},
                media:[{link:String,mimeType:String}],
                bookmarked:{type:Boolean,default:false},
                
            }
            ]
    }]
})


let User = models.Users || model('Users',UserSchema)

export default User