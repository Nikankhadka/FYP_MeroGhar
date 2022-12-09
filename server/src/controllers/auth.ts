//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUser} from "../services/auth"


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const newUser=await registerUser(userId,password);
        if(newUser) return res.status(200).json({ message:`user ${userId} successfully registered`})
        
        return res.status(409).json({ message:"user with id already exist"})
        
    }catch(err){
        res.status(400).json({ message:err})
    }
}

export const localLoginC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        

    }catch(e){
        console.log(e)
    }


}