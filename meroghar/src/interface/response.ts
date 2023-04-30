
//when another user views my profile information
export interface FetchedUserData {
    _id:string,
    userName: string
    profileImg: {
      imgId: string
      imgUrl: string
    }
    about:string
    email: {
      mail: string
      isVerified: boolean
    };
    
    createdAt: string
    kyc: {
      isVerified: boolean
    }
    kycInfo:{
        phoneNumber:string
    }
    listingCount: number
    avgRating: number
    recievedReviewcount: number
   
  }


  //my user detail fetched by me to update kyc information
  export interface FetchedMe{
    _id:string
    userId: string;
    userName: string;
    profileImg: {
      imgId: string;
      imgUrl: string;
    };
    about: string;
    email: {
      mail: string;
      isVerified: boolean;
    };
    createdAt: Date;
    is_Admin: boolean;
    kycInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      email: string;
      phoneNumber: string;
     
        country: string;
        state:string,
        city: string;
     
      img: {
        imgId: string;
        imgUrl: string;
      };
    };
    kyc: {
      isVerified: boolean;
      pending: boolean;
      message: string;
      approvedBy: string;
    };
    listingCount: number;
    avgRating: number;
    password:string
    recievedReviewcount: number;
  }



  // admin fetches this to view profile kyc profile verifcaiton
 export  interface IUserKyc {
    userId: string;
    userName: string;
    profileImg: {
      imgId: string;
      imgUrl: string;
    };
    about: string;
    email: {
      mail: string;
      isVerified: boolean;
    };

    createdAt: Date;
    kycInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      email: string;
      phoneNumber: string;
     
        country: string;
        state: string;
        city: string;
     
      img: {
        imgId: string;
        imgUrl: string;
      };
    };
    kyc: {
      isVerified: boolean;
      pending: boolean;
      message: string;
      approvedBy: string;
    };
    listingCount: number;
    avgRating: number;
    recievedReviewcount: number;
  }



  export interface Property{
    _id: string;
    userId: string;
    name: string;
    url: string;
   
      country: string;
      state: string;
      city: string;
   
    discription: string;
    propertyType: string;
    rules: string;
    amenities: string[];
    rate: number;
    images: {
      imgId: string;
      imgUrl: string;
    }[];
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
      approvedBy: string;
    };
  
  
}

export interface IReview{
  userId: string;
  propertyId: string
  rating: number;
  review: string;
  
    reportStatus: boolean;
    reportMessage: string;
    admin:string
    adminReview: string;
  
  createdAt: Date;
  updatedAt: Date;
}


export interface IBooking{
  _id:string,
  userId: Partial<FetchedUserData>
  propertyId:Partial<Property>
  hostId: string
  paymentId:Partial<Payment>
  status: string
  startDate: Date;
  endDate: Date;
  guest: number;
  checkInStatus:boolean
  checkOutStatus: boolean
  createdAt: Date;
  updatedAt: Date;
}


export interface Payment {
    payerId: string;
    bookingId:string
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