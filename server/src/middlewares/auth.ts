
import { Request,Response,NextFunction } from "express";
import { verifyAccessTokenS } from "../services/auth";






       
       

        
   



//to verify access token
export const verifyaccessToken=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.cookies.accessToken) return res.status(401).json({success:false,message:"access token not found"});
        const {accessToken}=req.cookies;
        
        //call service to verify access token
        console.log("middle are to very token")
        const {success,tokendata}=await verifyAccessTokenS(accessToken);
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
            console.log("inside verify role",req.user)
            if(!is_Admin==req.user.is_Admin) return res.status(400).json({success:false,message:"authorization role not valid"})
            
            //else
            next()
            
        }catch(e){
            return res.status(400).json({success:false,message:"authorization role not valid"})
        }
    }
}

    
