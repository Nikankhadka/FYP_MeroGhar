


export interface PropertyForm{
    name:string,
    location:{
      city:string,
      area:string,
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
      city:string
  },
  img:{
      imgId:string,
      imgUrl:string
  }
  }
  
}