//interface/type for response and request/next object

import{Request,Response,NextFunction} from 'express'
import joi, { string } from 'joi'


export const validateInput=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //defined joi schema for input validation of requet body
        const registerSchema=joi.object({
            userId:joi.string().required(),
            password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$')).required(),
        })

        //calls the validate method to check the value with schema  and validates both property to generate error response
        const{error,value}=registerSchema.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})
        
        console.log(value)
        next()

    }catch(err){
        return res.status(400).json(err)
    }
}


export const validateUpdateProfile=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //defined joi schema for input validation of requet body
        const updateProfileSchema=joi.object({
            userName:joi.string().optional(),
            password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$')).optional(),
            profile_img:{
                img_id:string().optional(),
                img_url:string().optional()
            }
        })

        //calls the validate method to check the value with schema  and validates both property to generate error response
        const{error,value}=updateProfileSchema.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})
        
        console.log(value)
        next()

    }catch(err){
        return res.status(400).json(err)
    }
}
