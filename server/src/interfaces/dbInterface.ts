import { Types } from "mongoose"

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
    kycInfo: {
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
    };
    kyc: {
      is_verified: boolean
      message: string
      approvedBy: string
    };
    listing_Count: number
    avg_rating: number
    recieved_Reviewcount: number
    wishList: Types.ObjectId[]
    is_banned: {
      strikes: number
      banTime: Date
    }
    rented_property: Types.ObjectId[]
    recommendation: Types.ObjectId[]
    viewed_property: Types.ObjectId[]
    kycVerificationRequests: Types.ObjectId[]|{
            firstName: string
            lastName: string
            gender: string
            email: string
            phoneNumber: string
            address: {
              country: string
              city: string
            }
    }[]
  
 }
 

 export interface Property{
  _id:Types.ObjectId;
  userId: string;
  name: string;
  url: string;
  location: {
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
  current_tennant: Types.ObjectId;
  rating_count: number;
  viewCount: number;
  avg_Rating: number;
  is_banned: boolean;
  is_verified: {
      status: boolean;
      message: string;
      approvedBy: string;
  };
  recommendation:Types.ObjectId[];
}
