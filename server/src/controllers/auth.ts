//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUser,Login,storeToken} from "../services/auth"
import {sign} from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const newUser=await registerUser(userId,password);
        if(newUser) return res.status(200).json({ message:`user ${userId} successfully registered`})
        
        return res.status(409).json({ success:false,message:"user with id already exist"})
        
    }catch(err){
        res.status(400).json({success:false, message:err})
    }
}




export const LoginC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const verifiedUser=await Login(userId,password);
        if(!verifiedUser) return res.status(401).json({success:false,message:"invalid credentials"});
        //generate acess and refresh token 
        const accessToken=await sign({
            verifiedUser
        },"ss@3%&*HHJJ**",{expiresIn:"1800s"})

        const refreshToken=await sign({
            verifiedUser
        },"ss@3%&*H%%BBHH&&**",{expiresIn:"30 days"})

        //now append refresh token to userdocument 
        const tokenStored=await storeToken(refreshToken,userId);
        if(!tokenStored) return res.status(500).json({ success:false,message:"token could not be stored"})

        //now attach the token to cookie and send it to client
        res.cookie("accessToken",accessToken,{maxAge:1800000,httpOnly:true})
        .cookie("refreshToken",refreshToken,{maxAge:2592000000,httpOnly:true})
        .status(200).json({success:true, message:"user successfully logged in"})


    }catch(e){
       return res.status(400).json({success:false,message:e})
    }
}


export const refreshTokenC=async(req:Request,res:Response)=>{
    try{






    }catch(e){
        return res.status(400).json({success:false,message:e})
    }
}