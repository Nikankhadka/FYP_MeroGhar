import { Request,Response } from "express";
import { updateViewCountS,createPropertyS,updatePropertyS, getPropertyS} from "../../services/property/property.service";





export const createPropertyC=async(req:Request,res:Response)=>{
    try{
        //check kyc verifcation 
        if(!req.userData.kycVerified) return res.status(401).json({success:false,error:"Kyc not Verified/Unauthorized user"});
        const newProperty=await createPropertyS(req.userData.userId,req.body)
        return res.status(200).json({success:true,message:"Property sent for further verification"})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}

export const getPropertyC=async(req:Request,res:Response)=>{
    try{
        if(req.userData.userId==""){
            const propertyData=await getPropertyS(req.params.id,"");
            return res.status(200).json({success:true,propertyData})
        }
        const propertyData=await getPropertyS(req.params.id,req.userData.userId);
        return res.status(200).json({success:true,propertyData})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}



export const updatePropertyC=async(req:Request,res:Response)=>{
    try{
        //check kyc verifcation 
        if(!req.userData.kycVerified) return res.status(401).json({success:false,error:"Kyc not Verified/Unauthorized user"});
        const updatedProperty=await updatePropertyS(req.userData.userId,req.params.id,req.body)
        return res.status(200).json({success:true,message:"Property updated and  sent for further verification",updatedProperty})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}














export const updateViewCountC=async(req:Request,res:Response)=>{
    try{
        //check if there is userdata
        if(req.userData.userId==""){
            const updateViewCount=await updateViewCountS("",req.params.id)
            if(updateViewCount) return res.status(200).json({success:true,message:"view count updated"})
        }

        //since user is authenticated
        const updateViewCount=await updateViewCountS(req.userData.userId,req.params.id)
        if(updateViewCount) return res.status(200).json({success:true,message:"view count updated/user recent product view Updated"})

        //if user has already viewed property then 
        return res.status(500).json({success:false,message:"view count not updated/user has already viewd product"})
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}