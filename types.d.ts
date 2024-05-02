
export interface userNotificationType{
  category:string,
  data:string,
  link:string,
  opened:boolean,
  date:number,
  owner:string

}
export type userModelType = {
  email: string;
  password: string;
  UUID: string;
  createdAt: Date;
  isPremium: boolean;
  username: string;
  isEmailVerified: boolean;
  token:{
     value:string,
     expires:number,
     nextRequestable:number
    
 };
  denonymous: {
    key:string
    owner:string;
    description:string;
    isDeleted: boolean;
    isActive: boolean;
    link: string;
    topic: string;
    dateCreated: number;
    responsesViewState: boolean;
    isVideoLimitOn: boolean;
    isAudioLimitOn: boolean;
    isImageLimitOn: boolean;
    replys: {
      key:string;
      visible:boolean;
      text: string;
      media: {
        link: string;
        mimeType: string;
      }[];
      bookmarked: boolean;
    }[];
  }[];
  notifications:userNotificationType[]
};


export interface denonymousType  {
  key:string
  owner:string;
  link: string;
  topic: string;
  description:string;
  dateCreated: number;
  isDeleted: boolean;
  isActive: boolean;
  responsesViewState: boolean;
  isVideoLimitOn: boolean;
  isAudioLimitOn: boolean;
  isImageLimitOn: boolean;
  replys: {
    key:string;
    visible:boolean;
    text: string;
    media: {
      link: string;
      mimeType: string;
    }[];
    bookmarked: boolean;
  }[];
}

export interface userDataJWTType {
  email: string;
  username:string
  uuid: string;
  verified: boolean;
  premium: boolean;
  expiry: string;
}

export interface baseResponseType {
  message: string;
  data: any;
}
// export interface JWTTokenType {
//   email: string;
//   uuid: string;
//   verified: boolean;
//   premium: boolean;
//   randomKey: string;
// }

export interface replyModelType {
  key:string;
  visible:boolean;
  text: string;
  media: {
    link: string;
    mimeType: string;
  }[];
  bookmarked: boolean;
}