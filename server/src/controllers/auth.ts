//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUserS, LoginS,verifyRefreshTokenS} from "../services/auth"

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
   
        const {userId,password}=req.body;
        try{
            const {success,accessToken,refreshToken,user}=await LoginS(userId,password);

            if(success)  return res.cookie("accessToken",accessToken,{maxAge:1800000,httpOnly:true,sameSite:"strict"})
            .cookie("refreshToken",refreshToken,{maxAge:2592000000,httpOnly:true,sameSite:"strict"})
            .status(200).json({success:true, message:"user successfully logged in",user})

             //now attach the token to cookie and send it to clien
          

        }catch(e:any){{
            console.log(e)
            return res.status(400).json({success:false,message:e.message})
        }} 
    
}


//dont need middle ware just verify and send response back to client 
export const refreshTokenC=async(req:Request,res:Response)=>{
    try{
        //get refresh token from cookie 
        if(!req.cookies.refreshToken) return res.status(401).json({success:false,message:" refresh token not found"});

        //now check the refresh token in database to find user for token reuse detection
       const refreshToken=req.cookies.refreshToken;

       //both token be cleared since new token is going to be generated if failed then hackers token will be deleted
        res.clearCookie("refreshToken").clearCookie("accessToken")

      //service for refresh token verification
      const {success,message,tokens}=await verifyRefreshTokenS(refreshToken);
      if(!success) return res.status(401).json({success:false,message})

      //now attach the token to cookie and send it to client
    
      res.cookie("accessToken",tokens.newaccessToken,{maxAge:1800000,httpOnly:true})
      .cookie("refreshToken",tokens.newrefreshToken,{maxAge:2592000000,httpOnly:true})
      .status(200).json({success:true, message:"user successfully verified"})



    }catch(e){
        console.log(e);
        res.status(401).json({success:false,message:"invalid request credential"})
    }  
}