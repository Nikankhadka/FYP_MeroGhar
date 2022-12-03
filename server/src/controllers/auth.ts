//this controller will contain necessary request handler for authentication and authorization

import {Request,Response} from "express"





export const registerUser=async(req:Request,res:Response)=>{
    try{
        
        console.log(req.body)
        return res.status(200).json({message:"User Registered Successfully"})

    }catch(err){
        console.log(err.message)
    }
}