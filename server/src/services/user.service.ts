import { userModel } from "../models/user"
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv"
import { sendMail } from "../utils/zohoMailer";
import { updateEmailTemplate,postEmailTemplate } from "../configs/mailtemplate";
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
        const emailUpdate=await userModel.updateOne({userId},{ "$set": {
             "email.mail":Email,
             "email.is_verified":false
        }})
        
        //send verification or request mail to change mail 
        const token=await sign({
            userId,
            Email,  
        },process.env.mailupdateSecret,{expiresIn:"1h"});

        //now pass this token to mail and send it to verify the userMail Update request
        const updateMailRequest=sendMail(postEmailTemplate(Email,token))
        
        return true;

    }catch(e){
        console.log(e)
        throw e
        
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
            const token=await sign({
                userId,
                newEmail,
                email:userEmailVerfied.email?.mail
            },process.env.mailupdateSecret,{expiresIn:"1h"});

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