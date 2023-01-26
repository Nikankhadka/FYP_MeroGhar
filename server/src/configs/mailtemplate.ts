import { mailBody } from "../interfaces/mail"
import * as dotenv from "dotenv"
dotenv.config()


//create function which takes basic information and returns mail template 
export const signupMail=(userName:string,userEmail:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"New User Signup/Registration",
        text:"",
        html:`<h1> Welcome to MeroGahr 👋 ${userName}</h1>
        <h3>We are excited to have You with us in your Journey of renting and Renting out property </h3>
        <p>if u have not Verified Yourself by filling kyc form here it is ... </P>
        <br>
        <a href="http://localhost:2900/user/v1/kycVerification">Kyc Form </a>
         `
    }
}
