
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

