//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"
import{registerUser,Login} from "../services/auth"
import {sign} from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


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

export const LoginC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        const verifiedUser=await Login(userId,password);
        if(!verifiedUser) return res.status(401).json({message:"invalid credentials"});
        //generate acess and refresh token 
        const accessToken=await sign({
            verifiedUser
        },"ss@3%&*HHJJ**",{expiresIn:"1800s"})

        const refreshToken=await sign({
            verifiedUser
        },"ss@3%&*H%%BBHH&&**",{expiresIn:"30 days"})


    }catch(e){
        console.log(e)
    }


}