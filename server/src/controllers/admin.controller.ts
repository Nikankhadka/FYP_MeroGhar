import { Request,Response } from "express";
import { getKycRequestsS, registerAdminS } from "../services/admin.service";

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