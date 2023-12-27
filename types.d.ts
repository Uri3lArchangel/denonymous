export type userModelType={
email:string;
password:string;
UUID:string;
createdAt:Date
isPremium:boolean;
username:string
isEmailVerified:boolean
denonymous:{
    id:number,
        link:string,
        topic:string,
        dateCreated:number;
        responsesViewState:boolean;
        isVideoLimitOn:boolean;
        isAudioLimitOn:boolean;
        isImageLimitOn:boolean;
        replys:{
            text:string;
            imageAvailable:boolean;
            images:String[];
            videoAvailable:boolean;
            videos:String[];
            audioAvailable:boolean;
            audios:String[];
            bookmarked:boolean
        }[]

}[]
}
export interface denonymousType{
    
        id:number,
            link:string,
            topic:string,
            dateCreated:number;
            responsesViewState:boolean;
            isVideoLimitOn:boolean;
            isAudioLimitOn:boolean;
            isImageLimitOn:boolean;
            replys:{
                text:string;
                imageAvailable:boolean;
                images:String[];
                videoAvailable:boolean;
                videos:String[];
                audioAvailable:boolean;
                audios:String[];
                bookmarked:boolean
            }[]
    

}

export interface userDataJWTType{
    email:string,
    uuid:string,
    verified:boolean,
    premium:boolean,
    randomKey:string
}

export interface baseResponseType{message:string,data:any}
export interface JWTTokenType{email:string,uuid:string,verified:boolean,premium:boolean,randomKey:string}