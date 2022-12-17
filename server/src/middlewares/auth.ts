import { Request,Response,NextFunction } from "express";

//this will extract token from header and attach it to req obj req.token
export tokenExtractor=async(req:Request,res:Response,next:NextFunction)=>{}


export verifyRefreshToken=async(req:Request,res:Response,next:NextFunction)=>{
    try{

    }catch(e){
        console.log(e)
    }
}