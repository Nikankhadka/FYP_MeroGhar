import { Types } from "mongoose"



interface kycSchema{
    firstName: string
    lastName: string
    gender: string
    email: string
    phoneNumber: string
    address: {
      country: string
      city: string
    };
    img: {
      img_id: string
      img_url: string
    }[];
  
}
 export interface IUser {
    userId: string
    userName: string
    password: string
    profile_Img: {
      img_id: string
      img_url: string
    }
    email: {
      mail: string
      is_verified: boolean
    };
    Token: string
    two_FA: boolean
    created_At: Date
    updated_At: Date
    refreshToken: string[]
    is_Admin: boolean
    kycInfo:kycSchema,
    kyc: {
      is_verified: boolean
      message: string
      approvedBy: string
    };
    listing_Count: number
    avg_rating: number
    recieved_Reviewcount: number
    wishList: {
      listName:string,
      properties:string
    }[],
    is_banned: {
      strikes: number
      banTime: Date
    }
    rented_property: Types.ObjectId[]
    recommendation: Types.ObjectId[]
    viewed_property: Types.ObjectId[]
    kycVerificationRequests: Types.ObjectId[]|kycSchema[]
 }
 

 export interface Property{
  
    _id: Types.ObjectId;
    userId: string;
    name: string;
    url: string;
    location: {
      country: string;
      city: string;
      area: string;
    };
    discription: string;
    property_type: string;
    rules: string[];
    amenities: string[];
    price: number;
    images: {
      img_id: string;
      img_url: string;
    }[];
    tennants: Types.ObjectId[];
    currentStatus: {
      availability: boolean;
      availableAfter: Date;
    };
    tennantId: Types.ObjectId;
    rating_count: number;
    viewCount: number;
    avg_Rating: number;
    is_banned: {
      status: boolean;
      message: string;
    };
    is_verified: {
      status: boolean;
      pending: boolean;
      message: string;
      approvedBy: string | Types.ObjectId;
    };
    recommendation: Types.ObjectId[];
  
}
