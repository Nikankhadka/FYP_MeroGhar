import { KycData, PropertyForm } from "../../interface/form";
import Api from "./axios";



export async function checkPhone(PhoneNumber:string):Promise<boolean>{
    try{
    const res=await Api.get(`/user/v1/verifyPhone/${PhoneNumber}`,{withCredentials:true});
    // if phone number exist return false
    if(!res.data.success){
     return false
    }
    return true;
    }catch(e){
        console.log(e)
        return false;
    }
    
}

export async function postPhone(PhoneNumber:string):Promise<boolean>{
    try{
    const res=await Api.post(`/user/v1/verifyPhone/${PhoneNumber}`,{},{withCredentials:true});
    // if phone number exist return false
    if(!res.data.success){
     return false
    }
    return true;
    }catch(e){
        console.log(e)
        return false
    }
    
}


export async function postKyc(kycData:KycData):Promise<boolean>{
    try{
        const res=await Api.post(`/user/v1/postKyc`,kycData,{withCredentials:true});
        if(!res.data.success){
            return false
           }
           return true;
    }catch(e){
        console.log(e)
        return false;
    }
}



interface imageUpload{
    imgId:string
    imgUrl:string
}

export async function uploadImage(image:any):Promise<imageUpload>{
    try{
         //there might be multiple image upload so
    const imageData = new FormData()
    //first upload image
    imageData.append('file',image)
    imageData.append('cloud_name', 'drpojzybw')
    imageData.append('upload_preset', 'FypMeroGhar')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drpojzybw/image/upload',
      {
        method: 'POST',
        body: imageData,
      }
    )
    const response = await res.json()
    return{
        imgId:response.public_id,
        imgUrl:response.url
    }

    }catch(e){
        console.log(e)
        throw e;
    }
}