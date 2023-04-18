
export interface FetchedUserData {
    _id:string,
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
    created_At: string
    kyc: {
      isVerified: boolean
    }
    kycInfo:{
        phoneNumber:string
    }
    listing_Count: number
    avg_rating: number
    recieved_Reviewcount: number
   
  }


  export interface FetchedMe{
    userId: string;
    userName: string;
    profileImg: {
      imgId: string;
      imgUrl: string;
    };
    About: string;
    email: {
      mail: string;
      is_verified: boolean;
    };
    created_At: Date;
    is_Admin: boolean;
    kycInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      email: string;
      phoneNumber: string;
      address: {
        country: string;
        state:string,
        city: string;
      };
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
    listing_Count: number;
    avg_rating: number;
    recieved_Reviewcount: number;
  }


 export  interface IUserKyc {
    userId: string;
    userName: string;
    profileImg: {
      imgId: string;
      imgUrl: string;
    };
    About: string;
    email: {
      mail: string;
      is_verified: boolean;
    };
    two_FA: boolean;
    created_At: Date;
    kycInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      email: string;
      phoneNumber: string;
      address: {
        country: string;
        state: string;
        city: string;
      };
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
    listing_Count: number;
    avg_rating: number;
    recieved_Reviewcount: number;
  }



  export interface Property{
  
    _id: string;
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
      approvedBy: string;
    };
    recommendation: string[];
  
}