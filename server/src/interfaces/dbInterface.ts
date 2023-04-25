import { Types } from "mongoose"



interface kycSchema{
    firstName: string
    lastName: string
    gender: string
    email: string
    phoneNumber: string
    country: string,
    state:string,
    city: string
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
    about:string
    email: {
      mail: string
      isVerified: boolean
    };
    token: string
    refreshToken: string[]
    is_Admin: boolean
    kycInfo:kycSchema,
    kyc: {
      isVerified: boolean
      message: string
      approvedBy: string
      pending:boolean
    };
    listingCount: number
    avgRating: number
    recievedReviewcount: number
    wishList:{
      listName:string,
      properties:[string]
    }[],
    isBanned: {
      strikes: number
      banStart:Date,
      banEnd:Date
      message:string
    }
    viewedProperty: Types.ObjectId[]
    createdAt: Date;
    updatedAt: Date;
    
 }
 

 export interface Property{
    _id: Types.ObjectId;
    userId:Types.ObjectId;
    name: string;
    url: string;
    country: string;
    state: string;
    city: string;
    discription: string;
    propertyType: string;
    rules:string;
    amenities:string[];
    rate:number;
    images:{
      imgId: string;
      imgUrl: string;
    }[];
    tennants: string[];
    ratingCount: number;
    viewCount: number;
    avgRating: number;
    isBanned: {
      status: boolean;
      message: string;
    };
    isVerified: {
      status: boolean;
      pending: boolean;
      message: string;
      approvedBy: string | Types.ObjectId;
    };
    createdAt: Date;
    updatedAt: Date;
  
}



export interface IReview{
  userId: Types.ObjectId;
  propertyId: Types.ObjectId;
  rating: number;
  review: string;
  
    reportStatus: boolean;
    reportMessage: string;
    admin: Types.ObjectId;
    adminReview: string;
  
  createdAt: Date;
  updatedAt: Date;
}


export interface IBooking{
  userId: Types.ObjectId;
  propertyId: Types.ObjectId;
  hostId: Types.ObjectId;
  status: string
  startDate: Date;
  endDate: Date;
  guest: number;
  ownerCheckInStatus: string
  tenantCheckInStatus: string
  ownerCheckOutStatus: string
  tenantCheckOutStatus: string
  createdAt: Date;
  updatedAt: Date;
}


export interface Payment {
    payerId: string;
    bookingId:Types.ObjectId;
    paymentDate: Date;
    initialAmount:number;
    serviceCharge:number;
    totalAmount:number;
    stay: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  // billImg?: string;
  // billId?: string;
}