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
     requestCount:number,
     nextRequestable:number
    
 };
  denonymous: {
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
      text: string;
      media: {
        link: string;
        mimeType: string;
      }[];
      bookmarked: boolean;
    }[];
  }[];
};
export interface denonymousType {
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
  randomKey: string;
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
  text: string;
  media: {
    link: string;
    mimeType: string;
  }[];
  bookmarked: boolean;
}
