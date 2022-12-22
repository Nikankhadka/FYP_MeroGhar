
import { Request,Response,NextFunction } from "express";

declare module "express"{
   export  interface Request{
        user:{
            userId:string,
            is_Admin:boolean
        }
    }
}

import { verifyAccessTokenS } from "../services/auth";




//middle ware to verify refreh token
export const verifyrefreshToken=async(req:Request,res:Response,next:NextFunction)=>{
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

       
       

        
   



//to verify access token
export const verifyaccessToken=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.cookies.accessToken) return res.status(401).json({success:false,message:"access token not found"});
        const {accessToken}=req.cookies;
        
        //call service to verify access token
        const {success,tokendata}=await verifyAccessTokenS(accessToken,"ss@3%&*HHJJ**");
        if(!success) return res.status(401).json({success:false,message:"invalid token credentials"})
       
        //store the token data req.user
        req.user=tokendata
        next()
        
    }catch(e){
        console.log(e)
        return res.status(401).json({success:false,message:"invalid request credential"})
    }
}


//custom middleware to verify roles
//here is role passed through parameter and stored in req.user.is_admin should match for 
export const verifyRole=(is_Admin:boolean)=>{
   return(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.user)
            if(!is_Admin==req.user.is_Admin) return res.status(400).json({success:false,message:"authorization role not valid"})
            
            //else
            next()
            
        }catch(e){
            return res.status(400).json({success:false,message:"authorization role not valid"})
        }
    }
}

    
