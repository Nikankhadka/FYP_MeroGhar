import { Request,Response } from "express";
import { registerAdminS } from "../services/admin.service";

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