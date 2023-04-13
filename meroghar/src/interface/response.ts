
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
      is_verified: boolean
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
        city: string;
      };
      img: {
        imgId: string;
        imgUrl: string;
      };
    };
    kyc: {
      is_verified: boolean;
      pending: boolean;
      message: string;
      approvedBy: string;
    };
    listing_Count: number;
    avg_rating: number;
    recieved_Reviewcount: number;
  }