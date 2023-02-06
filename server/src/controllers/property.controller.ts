import { Request,Response } from "express";
import { updateViewCountS } from "../services/property.service";

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