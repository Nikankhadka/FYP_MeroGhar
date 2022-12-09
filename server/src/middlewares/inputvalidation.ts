//interface/type for response and request/next object

import{Request,Response,NextFunction} from 'express'
import joi from 'joi'


export const validateAuth=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //defined joi schema for input validation of requet body
        const registerSchema=joi.object({
            userId:joi.string().required(),
            password:joi.string().required(),
        })

        //calls the validate method to check the value with schema  and validates both property to generate error response
        const{error,value}=registerSchema.validate(req.body,{abortEarly:false})
        if(error){
            console.log(error.details)
            return res.status(400).json(error.details)
        }
        console.log(value)
        next()

    }catch(err){
            console.log(err)
    }
}
