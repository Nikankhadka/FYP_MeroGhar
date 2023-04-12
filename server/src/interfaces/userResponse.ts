import { Types } from "mongoose"

export interface returnUserData {
    _id:Types.ObjectId,
    userName: string
    profileImg: {
      imgId: string
      imgUrl: string
    }
    About:string
    email: {
      mail: string
      is_verified: boolean
    };
    two_FA: boolean
    created_At: Date
    
    kyc: {
      is_verified: boolean
    }
    kycInfo:{
        phoneNumber:string
    }
    listing_Count: number
    avg_rating: number
    recieved_Reviewcount: number
   
  }