// this file is going to contain api call for property 

import { PropertyForm } from "../../interface/form";
import Api from "./axios";



export async function PostPropery(body:Partial<PropertyForm>):Promise<boolean>{
    try{
    const res=await Api.post("/property/v1/createProperty",body,{withCredentials:true});
    if(!res.data.success){
     throw new Error(res.data.error)
    }
    return true;
    }catch(e){
        console.log(e)
        throw e;
    }
    
}