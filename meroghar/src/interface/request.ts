
export interface LoginRegisterInput {
    userId: string
    password: string
}



export interface Images{
  img_id:string,
  img_url:string
}
export interface PostProperty{
    name:string,
    city:string,
    area:string,
    discription:string,
    property_type:string,
    rule:string,
    price:number,
    images:Images[],
    amenities:string[]
}


export interface FetchedUserData {
  userId: string
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
  updated_At: Date
  kyc: {
    is_verified: boolean
  };
  listing_Count: number
  avg_rating: number
  recieved_Reviewcount: number
 
}