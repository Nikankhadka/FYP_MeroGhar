import { Request,Response } from "express"
import joi from "joi"
import { updateEmailS,addEmailS } from "../services/user.service"


export const addEmailC=async(req:Request,res:Response)=>{
    try{
        //validate the email input passed in the body
        const emailSchema=joi.object({
            email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })
        const{error,value}=emailSchema.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})

        const postEmail=await addEmailS(req.userData.userId,req.body.email)
        if(postEmail) return res.status(200).json({success:true,message:"Email addes Please Verify Email"})

    }catch(e:any){
        console.log(e)
        return res.status(400).json({success:false,error:e.message})
    }
}









export const updateEmailC=async(req:Request,res:Response)=>{
    try{
        //validate the email input passed in the body
        const emailSchema=joi.object({
            email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })
        const{error,value}=emailSchema.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})

        const updatedEmail=await updateEmailS(req.userData.userId,req.body.email)


    }catch(e:any){
        console.log(e)
        return res.status(400).json({success:false,error:e.message})
    }
}