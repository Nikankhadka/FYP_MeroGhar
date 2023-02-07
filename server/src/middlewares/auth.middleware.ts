
import { Request,Response,NextFunction } from "express";
import { verifyAccessTokenS } from "../services/auth/auth.service";


//combined verify token+role in single middle ware 
//takes in custom value of admin or not first verifies the token data then verifies role with passed role 
//token verification works same for all just pass the role for rout if admin only true else false
export const verifyaccessToken=async(req:Request,res:Response,next:NextFunction)=>{
        if(!req.cookies.accessToken) return res.status(401).json({success:false,message:"access token not found"});
        const {accessToken}=req.cookies;

        try{
        const {success,tokendata}=await verifyAccessTokenS(accessToken);
        if(!success) return res.status(401).json({success:false,message:"invalid token credentials"})
       
        //store the token data req.user
         req.userData=tokendata;
        next()  
    }catch(e:any){
        console.log(e)
        return res.status(401).json({success:false,error:e.message})
    }
    
        
}

//verify roles for speciific api end points
export const verifyRole=(is_Admin:boolean)=>{


    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log("token verified now verify role",req.user)
        if(!is_Admin==req.userData.is_Admin) return res.status(400).json({success:false,error:"authorization role not valid"})
        next()
        }catch(e:any){
            console.log(e)
            return res.status(400).json({success:false,error:e.message})
        }
    }
}



//this middleware will basically clear the req.userData for every api request so when only new userdata is available
 export const clearUser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log("inside clear users");
        req.userData={
            userId:"",
            is_Admin:false
        }
        next();
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
 }
    

 //middle ware which for authentication state like cookies? if available authenticates,else skip to main controller

 export const checkCookie=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //if user doenot have access token redirect him to main controller
        if(!req.cookies.accessToken) return next('route');
        
        //since user has accessToken that he is logged and authenticated 
        next()
    }catch(e){
        console.log(e);
        next()
    }
 }