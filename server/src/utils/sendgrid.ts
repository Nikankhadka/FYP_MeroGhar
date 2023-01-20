//sender function module to send mail 
import {setApiKey,send} from "@sendgrid/mail"
import * as dotenv from "dotenv"
import { signupMail } from "../configs/mailtemplate";
dotenv.config()

//create a mail sender function 

export const sendMail=async(userName:string,email:string):Promise<boolean>=>{
    try{
        setApiKey(process.env.sendgridApiKey);

        //now call the template 
        const mailContents=await signupMail(userName,email);
        const mail=await send(mailContents);
        console.log("User Signup mail send Successfully")
        return true


    }catch(e){
        console.log(e)
        return false;
       
    }
}