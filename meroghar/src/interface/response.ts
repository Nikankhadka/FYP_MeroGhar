
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