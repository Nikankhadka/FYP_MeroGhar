//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUserS, LoginS} from "../services/auth"

import dotenv from "dotenv";
dotenv.config();


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const newUser=await registerUserS(userId,password);
        if(newUser) return res.status(200).json({ message:`user ${userId} successfully registered`})
        
        return res.status(409).json({ success:false,message:"user with id already exist"})
        
    }catch(err){
        res.status(400).json({success:false, message:err})
    }
}




export const LoginC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const {success,message,accessToken,refreshToken}=await LoginS(userId,password)!;
        
        if(!success) return res.status(401).json({success:false,message:`${message}`})
       
      

        //now attach the token to cookie and send it to client
        res.cookie("accessToken",accessToken,{maxAge:1800000,httpOnly:true})
        .cookie("refreshToken",refreshToken,{maxAge:2592000000,httpOnly:true})
        .status(200).json({success:true, message:"user successfully logged in"})


    }catch(e){
       return res.status(400).json({success:false,message:e})
    }
}


//dont need middle ware just verify and send response back to client 
export const refreshTokenC=async(req:Request,res:Response)=>{
    try{
        //get refresh token from cookie 
        if(!req.cookies.refreshToken) return res.status(401).json({success:false,message:" refresh token not found"});

        //now check the refresh token in database to find user for token reuse detection
       const refreshToken=req.cookies.refreshToken;
        


    }catch(e){
        console.log(e);
        res.status(401).json({success:false,message:"invalid request credential"})
    }  
}