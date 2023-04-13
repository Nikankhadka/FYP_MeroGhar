


export interface PropertyForm{
    name:string,
    location:{
      country:string,
      state:string,
      city:string,
    },   
    discription:string,
    property_type:string,
    rules:string,
    price:number,
    images:any[],
    amenities:string[]
}


export interface KycData{
  kycInfo:{
      firstName:string,
  lastName:string,
  gender:string,
  email?:string,
  address:{
    country:string,
    state:string,
    city:string,
  },
  img:{
      imgId:string,
      imgUrl:string
  }
  }
  
}