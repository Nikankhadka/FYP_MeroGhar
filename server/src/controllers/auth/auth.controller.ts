//this controller will contain necessary request handler for authentication and authorization

import {NextFunction, Request,Response} from "express"
import{registerUserS, LoginS,verifyRefreshTokenS, googleLoginS,facebookLoginS, logOutS} from "../../services/auth/auth.service"
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

import dotenv from "dotenv";

dotenv.config();


export const registerUserC=async(req:Request,res:Response)=>{
    try{
        const {userId,password}=req.body;
        console.log("inside register user controller")
        const newUser=await registerUserS(userId,password);
        if(newUser) return res.status(200).json({success:true, message:`user ${userId} successfully registered`})
        
        return res.status(400).json({success:false,error:"user with id already exist"})
        
    }catch(err:any){
        res.status(400).json({success:false, error:err.message})
    }
}





export const LoginC=async(req:Request,res:Response)=>{
   
        const {userId,password}=req.body;
        try{
            const {success,accessToken,refreshToken,user}=await LoginS(userId,password);

            if(success) {
               
           return  res.cookie("accessToken",accessToken,{maxAge:900000 ,httpOnly:true})
            .cookie("refreshToken",refreshToken,{maxAge:604800000,httpOnly:true})
            .cookie("session",JSON.stringify(user),{maxAge:720000,httpOnly:true})
            .status(200).send({success:true, message:"user successfully logged in",user});
            } 

             //now attach the token to cookie and send it to clien
          

        }catch(e:any){{
            console.log(e)
            return res.status(400).json({success:false,message:e.message})
        }} 
    
}


//dont need middle ware just verify and send response back to client 
export const refreshTokenC=async(req:Request,res:Response)=>{
    try{
        
        if(!req.cookies.refreshToken) return res.status(401).json({success:false,message:" refresh token not found"});

        //now check the refresh token in database to find user for token reuse detection
       const refreshToken=req.cookies.refreshToken;
       console.log(req.cookies)

       //both token be cleared since new token is going to be generated if failed then hackers token will be deleted
        res.clearCookie("refreshToken").clearCookie("accessToken")

      //service for refresh token verification
      const {success,message,tokens,user}=await verifyRefreshTokenS(refreshToken);
      if(!success) return res.status(401).json({success:false,message})

      //now attach the token to cookie and send it to client
    
      //if client side request then set else use response data to set in Nextjs middleware
      res.cookie("accessToken",tokens.newaccessToken,{maxAge:900000,httpOnly:true})
      .cookie("refreshToken",tokens.newrefreshToken,{maxAge:604800000,httpOnly:true}).cookie("session",JSON.stringify(user),{maxAge:720000,httpOnly:true,sameSite:"strict"})
      .status(200).json({success:true, message:"user successfully verified",accessToken:tokens.newaccessToken,refreshToken:tokens.newrefreshToken,user});



    }catch(e:any){
        console.log(e);
        res.status(401).json({success:false,message:e.message})
    }  
}



//conroller for google login
export const googleLoginC=async(req:Request,res:Response)=>{
    try{
       
        console.log(req.user);
        const {accessToken,refreshToken,user}=await googleLoginS(req.user)
        res.cookie("accessToken",accessToken,{maxAge:900000,httpOnly:true})
      .cookie("refreshToken",refreshToken,{maxAge:604800000,httpOnly:true}).cookie("session",JSON.stringify(user),{maxAge:720000,httpOnly:true,sameSite:"strict"})
      .status(StatusCodes.OK).redirect("http://localhost:3000")

    }catch(e:any){
        console.log(e);
        res.status(401).redirect("http://localhost:3000")
    }

}


export const facebookLoginC=async(req:Request,res:Response)=>{
    try{
       
        console.log(req.user);
        const {accessToken,refreshToken,user}=await facebookLoginS(req.user)
        res.cookie("accessToken",accessToken,{maxAge:900000,httpOnly:true})
      .cookie("refreshToken",refreshToken,{maxAge:604800000,httpOnly:true}).cookie("session",JSON.stringify(user),{maxAge:720000,httpOnly:true,sameSite:"strict"})
      .status(200).redirect("http://localhost:3000")

    }catch(e:any){
        console.log(e);
        res.status(401).redirect("http://localhost:3000")
    }

}

export const logOutC=async(req:Request,res:Response,next:NextFunction)=>{
    try{
    if(!req.cookies.refreshToken) return res.status(204).json({success:false,err:"Invalid logout credential"})
    const{refreshToken}=req.cookies
    const verifyToken=await logOutS(refreshToken);
   if(verifyToken) return  res.status(204).clearCookie("refreshToken",{httpOnly:true}).json({success:true,message:'user logged out'})
   res.status(204).clearCookie("refreshToken",{httpOnly:true}).json({success:false})
    }catch(e:any){
        //if invalid token use detected clear cookie from imposter
        console.log(e)
        
    }
}