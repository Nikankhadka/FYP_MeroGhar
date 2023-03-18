


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
