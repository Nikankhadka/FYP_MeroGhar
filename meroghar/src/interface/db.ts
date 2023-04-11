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
      is_verified: boolean
      message: string
      approvedBy: string
      pending:boolean
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
    
 }