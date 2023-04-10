
import { Request,Response,NextFunction } from "express";
import { verifyAccessTokenS } from "../services/auth/auth.service";


//combined verify token+role in single middle ware 
//takes in custom value of admin or not first verifies the token data then verifies role with passed role 
//token verification works same for all just pass the role for rout if admin only true else false
export const verifyaccessToken=(verify:boolean)=>{

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
        // check authentication since it is asked
        if(verify){
        if(!req.cookies.accessToken) return res.status(401).json({success:false,message:"access token not found"});
        const {accessToken}=req.cookies;
        

        
        const {success,tokendata}=await verifyAccessTokenS(accessToken);
        if(!success) return res.status(401).json({success:false,message:"invalid token credentials"})
       
        
        //store the token data req.user
         req.userData=tokendata;
        next()  
        console.log('next called')

    }else{
        if(!req.cookies.accessToken){
            console.log("not token not compulsory")
            next()
        }else{
            // if there is token then it needs to verified and used
            const {accessToken}=req.cookies;
        

        
        const {success,tokendata}=await verifyAccessTokenS(accessToken);
        if(!success) return res.status(401).json({success:false,message:"invalid token credentials"})
       
        
        //store the token data req.user
         req.userData=tokendata;
        next()  
        console.log('next called')
        }
    }


}
catch(e:any){
    console.log(e)
    return res.status(401).json({authState:false,error:e.message})
}
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
            is_Admin:false,
            kycVerified:false
        }


        next();
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
 }
    

 //middle ware which for authentication state like cookies? if available authenticates,else skip to main controller
