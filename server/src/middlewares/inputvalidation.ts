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


export const validateProfile=async(req:Request,res:Response,next:NextFunction)=>{
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


export const validateKyc=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //defined joi schema for input validation of requet body
        const KycSchema=joi.object({
            firstName:joi.string().required(),
            lastName:joi.string().required(),
            gender:joi.string().required(),
            email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
            phoneNumber:joi.string().min(10).max(10).required(),
            address:{
                country:joi.string().min(4).max(4).required(),
                city:joi.string().min(4).max(4).required()
            },

            //when defining complex tyope can use joi.object to define schema,or can simply create object and nest 
            //or like below define array and for its items pass object schema , or direct obj property
            img:joi.array().items({
                img_id:joi.string().required(),
                img_url:joi.string().required()
            }).required()
        })

        //calls the validate method to check the value with schema  and validates both property to generate error response
        const{error,value}=KycSchema.validate(req.body,{abortEarly:false})
        if(error) return res.status(400).json({success:false,message:error.message})
        
        console.log(value)
        next()

    }catch(err){
        return res.status(400).json(err)
    }
}


export const validateProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const PropertySchema = joi.object({
            
            name: joi.string().required(),
            location:{
                city: joi.string().min(4).required(),
                area: joi.string().min(4).required(),
            },
            discription: joi.string().min(15).required(),
            property_type: joi.string().required(),
            rules: joi.array().items(joi.string()).required(),
            amenities: joi.array().items(joi.string()).required(),
            price: joi.number().required(),
            images: joi.array().items(
                {
                    img_id: joi.string().required(),
                    img_url: joi.string().required(),
                }
            ).required()
        });

        const { error, value } = PropertySchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ success: false, message: error.message });

        next();
    } catch (err) {
        return res.status(400).json(err);
    }
};

