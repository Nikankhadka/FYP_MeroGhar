import { Types } from "mongoose"
export interface updateProfile{
    userName:string,
    password:string,
    profile_Img:{
        img_id:string,
        img_url:string
    }
}



export interface KycData{
    kycInfo:{
        firstName:string,
    lastName:string,
    gender:string,
    email?:string,
    phoneNumber:string,
    address:{
        country:string,
        city:string
    },
    img:{
        img_id:string,
        img_url:string
    }
    }
    
}

