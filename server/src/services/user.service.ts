import { userModel } from "../models/user"
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
import { sendMail } from "../utils/zohoMailer";
import { updateEmailTemplate,postEmailTemplate } from "../configs/mailtemplate";
import { updateProfile } from "../interfaces/inputInterface";
import { compare, hash } from "bcrypt";
dotenv.config()



export const addEmailS=async(userId:string,Email:string):Promise<boolean>=>{
    try{
        //first check whethe this email exist or not in our system 
        const emailExist =await userModel.findOne({email:{mail:Email}});
        if(emailExist) throw new Error("Account with this email already Exist in the System")

        //now check whether the user has verfied email or not 
        const userEmailVerfied=await userModel.findOne({userId,email:{is_verified:true}});
        if(userEmailVerfied) throw new Error("User with verified email is not allowed to Add new or Replace Email")

        
        //since users email is not verified simply update the email in document with new email

         //send verification or request mail to change mail and also store token in db to avoid misuse
        const token=await jwt.sign({
            userId,
            Email,  
        },process.env.mailSecret,{expiresIn:"1h"});

        const emailUpdate=await userModel.updateOne({userId},{ "$set": {
             "email.mail":Email,
             "email.is_verified":false,
             "Token":token
        }})
        
       
       

        //now pass this token to mail and send it to verify the userMail Update request
        const updateMailRequest=sendMail(postEmailTemplate(Email,token))
        
        return true;

    }catch(e){
        console.log(e)
        throw e
        
    }
}

export const verifyEmailS=async(Token:string):Promise<boolean>=>{
    try{
        //first match the token in db 
        const tokenMatch=await userModel.findOne({Token})
        if(!tokenMatch) throw new Error("Invalid Token,Token not found in db")

        
        const {userId,Email}= <jwt.verifyEmailPayload>jwt.verify(Token,process.env.mailSecret)
        //if token expired error is throw catched and send back 
        if(tokenMatch.userId!==userId) throw new Error("Token Data not matched with acutal users Token")
        
        //since user token is verified now update document and verify email 
        const emailUpdate=await userModel.updateOne({userId},{ "$set": {"email.is_verified":true}})
        return true;

    }catch(e){
        throw e
       
    }
}


export const updateProfileS=async(userId:string,profileData:Partial<updateProfile>):Promise<boolean>=>{
    try{

        //special condition for password cant change into old password and also hash password before saving into db
        if(profileData.password){
            const user=await userModel.findOne({userId});
            if(await compare(profileData.password,user?.password!)) throw new Error("Please Enter New password to  Update,Same Password used")

            //since password is new need to hash the password 
            profileData.password=await hash(profileData.password,process.env.salt_rounds);
        }

        const updatedUserProfile=await userModel.updateOne({userId},{...profileData},{new:true});
        return true

    }catch(e){
        console.log(e)
        throw e;
    }
}









export const updateEmailS=async(userId:string,newEmail:string)=>{
    try{
        //first check whethe this email exist or not in our system 
        const emailExist =await userModel.findOne({email:{mail:newEmail}});
        if(emailExist) throw new Error("Account with this email already Exist in the System")

        //now check whether the user has verfied email or not 
        const userEmailVerfied=await userModel.findOne({userId,email:{is_verified:true}});
        if(userEmailVerfied) {
            //send verification or request mail to change mail 
            const token=await jwt.sign({
                userId,
                newEmail,
                email:userEmailVerfied.email?.mail
            },process.env.mailSecret,{expiresIn:"1h"});

            //now pass this token to mail and send it to verify the userMail Update request
            const updateMailRequest=sendMail(updateEmailTemplate(userEmailVerfied.email?.mail!,token,newEmail))
            throw new Error("user already has a verified mail, Accept EmailUpdateRequest in the Mail send")
        }

        
        //since users email is not verified simply update the email in document with new email
        const emailUpdate=await userModel.updateOne({userId},{ "$set": {
             "email.mail":newEmail,
             "email.is_verified":false
        }})




    }catch(e){
        console.log(e)
        throw e
        
    }
}