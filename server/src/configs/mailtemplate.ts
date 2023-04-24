import { mailBody } from "../interfaces/mail"
import * as dotenv from "dotenv"
dotenv.config()


//create function which takes basic information and returns mail template 
export const signupMailTemplate=(userName:string,userEmail:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"New User Signup/Registration",
        text:"",
        html:`<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #f5f5f5;
                }
        
                h1 {
                    color: #4CAF50;
                    font-size: 32px;
                    margin-top: 0;
                }
        
                h3 {
                    color: #444;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    color: #555;
                    font-size: 18px;
                    margin-top: 0;
                }
        
                a {
                    color: #fff;
                    background-color: #4CAF50;
                    padding: 10px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to MeroGahr 👋 ${userName}</h1>
            <h3>We are excited to have you with us in your journey of renting and renting out property</h3>
            <p>If you have not verified yourself by filling KYC form, here it is:</p>
            <br>
            <a href="http://localhost:3000/kyc">KYC Form</a>
        </body>
        </html>
         `
    }
}


export const postEmailTemplate=(userEmail:string,token:string,):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Update Email Request",
        text:"",
        html:` <p>Verify Email by Clicking the link Given below.....</p>
        <a href="http://localhost:2900/user/v1/verifyEmail/${token}" >verify Email</a>
         `
    }
}


export const updateEmailTemplate=(userEmail:string,token:string,newMail:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Update Email Request",
        text:"",
        html:` <p>Verify Email to update Your Email Adress with New Email Adress:${newMail}</p>
        <a href="http://localhost:2900/user/v1/updateMailRequest/${token}" >Accept Email Update</a>
         `
    }
}



export const verifyEmailTemplate=(userName:string,userEmail:string):mailBody=>{
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
