import { Types } from "mongoose"



interface kycSchema{
    firstName: string
    lastName: string
    gender: string
    email: string
    phoneNumber: string
    address: {
      country: string,
      state:string,
      city: string
    };
    img: {
      imgId: string
      imgUrl: string
    };
  
}
 export interface IUser {
    userId: string
    userName: string
    password: string
    profileImg: {
      imgId: string
      imgUrl: string
    }
    About:string
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
      isVerified: boolean
      message: string
      approvedBy: string
      pending:boolean
    };
    listing_Count: number
    avg_rating: number
    recieved_Reviewcount: number
    wishList: {
      listName:string,
      properties:string[]
    }[],
    is_banned: {
      strikes: number
      banStart:Date,
      banEnd:Date
      message:string
    }
    rented_property: Types.ObjectId[]
    recommendation: Types.ObjectId[]
    viewed_property: Types.ObjectId[]
    
 }
 

 export interface Property{
  
    _id: Types.ObjectId;
    userId: string;
    name: string;
    url: string;
    location: {
      country: string;
      state: string;
      city: string;
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
    tennants: string[];
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



export interface IReview{
  userId:string,
  propertyId:Types.ObjectId,
  rating:{
    property:number,
    host:number,
    value:number
  },
  overallRating:number,
  review:string,
  report:{
    status:boolean,
    message:string,
    admin:string,
    adminReview:string
  }
}


export interface IBooking{
  userId:string,
  propertyId:Types.ObjectId,
  hostId:string,
  createdAt:Date,
  startDate:Date,
  endDate:Date,
  guest:string
}