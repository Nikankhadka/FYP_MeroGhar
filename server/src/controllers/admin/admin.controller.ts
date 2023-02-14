import { Request,Response } from "express";
import { getKycRequestsS, getPropertyRequestsS, registerAdminS, verifyKycRequestsS,verifyPropertyRequestsS} from "../../services/admin/admin.service";
import joi from "joi"


export const registerAdminC=async(req:Request,res:Response)=>{
    try{
        const{userId,password}=req.body
        const newAdmin=await registerAdminS(userId,password)
        if(newAdmin) return res.status(200).json({success:true,message:`Admin successfully registered with id: ${userId}`})
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}

export const getKycRequestsC=async(req:Request,res:Response)=>{
    try{
        const kycRequests=await getKycRequestsS(req.userData.userId);
        if(kycRequests)return res.status(200).json({success:false,kycRequests})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}

export const verifyKycRequestsC=async(req:Request,res:Response)=>{
    try{
        const kycVerify=joi.object({
            isVerified:joi.boolean().required(),
            message:joi.string().min(10).optional(),
        })

        const{error,value}=kycVerify.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})

        const requestVerified=await verifyKycRequestsS(req.userData.userId,req.params.id,req.body);
        //since error thrown is the failure otherwise verified or not is part of the query so its ok
        if(requestVerified)return res.status(200).json({success:true})

    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}


export const getPropertyRequestsC=async(req:Request,res:Response)=>{
    try{   
        const propertyRequests=await getPropertyRequestsS()
        return res.status(200).json({success:true,propertyRequests})
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}



export const verifyPropertyRequestsC=async(req:Request,res:Response)=>{
    try{
        const propertyVerify=joi.object({
            isVerified:joi.boolean().required(),
            message:joi.string().min(5).optional(),
        })

        const{error,value}=propertyVerify.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})

        const requestVerified=await verifyPropertyRequestsS(req.userData.userId,req.params.id,req.body.isVerified,req.body.message);
        //since error thrown is the failure otherwise verified or not is part of the query so its ok
        if(requestVerified)return res.status(200).json({success:true,message:`property successfully ${req.body.isVerified}`})

    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}