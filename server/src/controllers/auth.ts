//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUser} from "../services/auth"


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const queryStatus=await registerUser(userId,password);
        if(queryStatus){
            res.status(200).json({
            message:"User created successfully",
            user:userId
            })
        }
        res.status(400).json({ message:"User already exist"})
        
    }catch(err){
        console.log(err)
    }
}