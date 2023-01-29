import { userModel } from "../models/user";

//needs to be declared before the use case
declare module 'jsonwebtoken' {
    export interface JwtPayload {
       userId: string,
       is_Admin:boolean
   }
}
import * as jwt from "jsonwebtoken"
import {hash,compare} from "bcrypt"
import * as dotenv from "dotenv"
import {LSR1} from "../interfaces/Auth"
import { googleProfile } from "../interfaces/Auth";
import { generateTokens } from "../utils/token";
import {signupMailTemplate } from "../configs/mailtemplate";
import { sendMail } from "../utils/zohoMailer";







//*********************************** */
dotenv.config();
// *******************************register user service************************************


export const registerUserS=async(userId:string,password:string):Promise<boolean>=>{
    try{
        
        const userExist=await userModel.findOne({userId:userId});
        if(userExist) return false;
       
        //since no user create new user
        const newUser=await userModel.create({
            userId:userId,
            userName:userId,
            password:await hash(password,process.env.salt_rounds!)
        })

        //not necessary to call but call
        await newUser.save();
        console.log(newUser._id);
        return true;

    }catch(e){
        throw e
        
    }
}


//define type of data this function is going to return 






export const LoginS=async(userId:string,password:string):Promise<LSR1>=>{
    try{
        console.log("inside login service");
        const foundUser=await userModel.findOne({userId});
         if(!foundUser)  throw new Error("User Not Found")
        //if string variable does not take Strig\undefined then use ! to tell typescript that it will not be undefined
        const verifiedUser=await compare(password,foundUser.password!);
        if(!verifiedUser) throw new Error("Invalid User Credentials")
        
        //since user is been verfied 
         const {accessToken,refreshToken}=await generateTokens(userId,foundUser.is_Admin);

        //now append refresh token to userdocument 
         const tokenStored=await foundUser.refreshToken.push(refreshToken);
        await foundUser.save();

        //throw error or return false 
        if(!tokenStored) throw new Error("Token storage failed")

        return {success:true,accessToken,refreshToken,user:{userId,is_Admin:foundUser.is_Admin}}

    }catch(e){
        console.log(e)
        throw e;
    }
}







//service layer to verify token along with user in db
export const verifyAccessTokenS=async(token:string):Promise<{success:boolean,tokendata:jwt.JwtPayload}>=>{
    try{
        
        //if token is expire or error here it will be cathced and handled
       const {userId,is_Admin}=await <jwt.JwtPayload>jwt.verify(token,process.env.accessToken!)
        const isValid=await userModel.findOne({userId,is_Admin});
        if(!isValid) throw new Error("invalid token data")
    
        //now since tokenn data is validated just return query status and token data
        return {success:true,tokendata:{userId,is_Admin}}

    }catch(e){
        console.log(e)
        throw e;
    }
}



//service to verify token and give new tokens back 
export const verifyRefreshTokenS=async(refreshToken:string):Promise<{success:boolean,message:string,tokens:{newaccessToken:string,newrefreshToken:string}}>=>{
        try{
            //find user with token
            const foundUser=await userModel.findOne({refreshToken})

            //if user not found token is reused or invalid 
            if(!foundUser){
               
                    //hacked user
                    const {userId,is_Admin} =await <jwt.JwtPayload>jwt.verify(refreshToken,process.env.refreshToken!)
                    const hackedUser=await userModel.findOne({userId,is_Admin})
                    if(!hackedUser) throw new Error("Invalid token data, user not valid")
                    //if user is hacked
                    hackedUser.refreshToken=[]
                    await hackedUser.save();
                    throw new Error("Invalid token use detected,User hacked")
                }

                //array to store tokens except the current token
                const newRefreshTokenArray = foundUser.refreshToken.filter(token => token !== refreshToken);
                //since refreh token was found in userdb verify token data
                try{
                    
                    const {userId,is_Admin}=await <jwt.JwtPayload> jwt.verify(refreshToken,process.env.refreshToken!);
                    //validate token data
                    if (foundUser.userId !==userId) throw new Error("invalid token use detected,data mismatched");

                    //since token was valid perfect now create new tokens
                    const newaccessToken=await jwt.sign({
                        userId, is_Admin
                    },process.env.accessToken!,{expiresIn:"1800s"})
            
                    const newrefreshToken=await jwt.sign({
                        userId,is_Admin
                    },process.env.refreshToken!,{expiresIn:"30 days"})
            
                    //store refrehtoken 
                    foundUser.refreshToken = await [...newRefreshTokenArray, newrefreshToken];
                    await foundUser.save();
                    return {success:true,message:"refresh Token verfied Successfully",tokens:{newaccessToken,newrefreshToken}};


                }catch(e){
                    //if token invalid then filter and get other token except then current token 
                    
                    foundUser.refreshToken=newRefreshTokenArray;
                    await foundUser.save();
                    throw e;
                }
             

        }catch(e){
            console.log(e)
            throw e;
        }
       


}

        
export const googleLoginS=async(profileData:googleProfile):Promise<{accessToken:string,refreshToken:string}>=>{
    try{
        
        const{userName,email,profile_Img}=profileData
        const userExist=await userModel.findOne({userId:email})
        if(userExist){ 
            console.log("user with email exist")
            const{accessToken,refreshToken}=await generateTokens(email,userExist.is_Admin);
            //push refresh token into userdb
            const tokenStored=await userExist.refreshToken.push(refreshToken);
            await userExist.save();
            return {accessToken,refreshToken};
        }

        //since no user create new user
        const newUser=await userModel.create({
            userId:email,
            userName,
            email:{
                mail:email,
                is_verified:true
            },
            profile_Img:{
                img_id:"",
                img_url:profile_Img
            },
            kyc:{
                email:email
            }
        })
        await newUser.save();
        const{accessToken,refreshToken}=await generateTokens(email,newUser.is_Admin);
            //push refresh token into userdb
        const tokenStored=await newUser.refreshToken.push(refreshToken);
        await newUser.save();

        //send welcome email to user
        console.log("before mail send function or template is passed",userName,email)
        //dont need to wait as it takes time to send mail
        sendMail(signupMailTemplate(userName,email))
        return {accessToken,refreshToken};
        

    }catch(e){
        console.log(e);
        throw e;
    }
}

export const facebookLoginS=async(profileData:googleProfile):Promise<{accessToken:string,refreshToken:string}>=>{
    try{
         //here email will contain facebook id
        const{userName,email,profile_Img}=profileData
        const userExist=await userModel.findOne({userId:email})
        if(userExist){ 
            const{accessToken,refreshToken}=await generateTokens(email,userExist.is_Admin);
            //push refresh token into userdb
            const tokenStored=await userExist.refreshToken.push(refreshToken);
            await userExist.save();
            return {accessToken,refreshToken};
        }

        //since no user create new user
        const newUser=await userModel.create({
            userId:email,
            userName,
            profile_Img:{
                img_id:"",
                img_url:profile_Img
            }
        })
        await newUser.save();
        const{accessToken,refreshToken}=await generateTokens(email,newUser.is_Admin);
            //push refresh token into userdb
        const tokenStored=await newUser.refreshToken.push(refreshToken);
        await newUser.save();
        return {accessToken,refreshToken};
        

    }catch(e){
        console.log(e);
        throw e;
    }
}


export const logOutS=async(refreshToken:string):Promise<boolean>=>{
   try{
    const user=await userModel.findOne({refreshToken});
    if(!user) throw new Error("Invalid token use detected")

    //since user with token exist
    user.refreshToken=await user.refreshToken.filter(token=>token!==refreshToken)
    await user.save()
    return true;


   }catch(e){
    console.log(e)
    throw e;
   }
}