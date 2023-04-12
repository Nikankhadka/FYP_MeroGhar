import { userModel } from "../../models/user";

declare module "jsonwebtoken" {
     interface JwtPayload {
       userId: string,
       is_Admin:boolean,
       kycVerified:boolean
   }
}

import * as jwt from "jsonwebtoken"
import {hash,compare} from "bcrypt"
import * as dotenv from "dotenv"
import {LSR1, refreshTService} from "../../interfaces/Auth"
import { googleProfile } from "../../interfaces/Auth";
import { generateTokens } from "../../utils/token";
import {signupMailTemplate } from "../../configs/mailtemplate";
import { sendMail } from "../../utils/zohoMailer";
import { Types } from "mongoose";







//*********************************** */
dotenv.config();
// *******************************register user service************************************


export const registerUserS=async(userId:string,password:string):Promise<boolean>=>{
    try{
        console.log("registerService",userId)
        const userExist=await userModel.findOne({userId:userId});
        if(userExist) return false;
       
        //since no user create new user
        const newUser=await userModel.create({
            userId:userId,
            userName:userId,
            password:await hash(password,8),
            profile_Img:{
                imgId:"",
                imgUrl:""
            }
        })

        //not necessary to call but call
        await newUser.save();
        if(!newUser) throw new Error("User registration failed")
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
         const {accessToken,refreshToken}=await generateTokens(userId,foundUser.is_Admin,foundUser.kyc.is_verified);

        //now append refresh token to userdocument 
         const tokenStored=await foundUser.refreshToken.push(refreshToken);
        await foundUser.save();

        //throw error or return false 
        if(!tokenStored) throw new Error("Token storage failed")

        return {success:true,accessToken,refreshToken,user:{userId:foundUser._id,is_Admin:foundUser.is_Admin,img:foundUser.profileImg.imgUrl}}

    }catch(e){
        console.log(e)
        throw e;
    }
}






//service layer to verify token along with user in db
export const verifyAccessTokenS=async(token:string):Promise<{success:boolean,tokendata:{userId:string,is_Admin:boolean,kycVerified:boolean}}>=>{
    try{
        console.log('atoken',token)
        //if token is expire or error here it will be cathced and handled
       const {userId,is_Admin,kycVerified}=await <jwt.JwtPayload> jwt.verify(token,process.env.accessToken!)
       console.log('token verified')
       console.log(userId,is_Admin,kycVerified)
        const isValid=await userModel.findOne({userId,is_Admin});
        if(!isValid) throw new Error("invalid token data")
        
        
        //now since tokenn data is validated just return query status and token data
        return {success:true,tokendata:{userId,is_Admin,kycVerified}}

    }catch(e){
        console.log(e)
        throw e;
    }
}



//service to verify token and give new tokens back 
export const verifyRefreshTokenS=async(refreshToken:string):Promise<refreshTService>=>{
        try{
            //find user with token
            const foundUser=await userModel.findOne({refreshToken})

            //if user not found token is reused or invalid 
            if(!foundUser){
               
                    //hacked user
                    const {userId,is_Admin,kycVerified} =await <jwt.JwtPayload>jwt.verify(refreshToken,process.env.refreshToken!)
                    const hackedUser=await userModel.findOne({userId,is_Admin,kyc:{is_verified:kycVerified}})
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
                    
                    const {userId,is_Admin,kycVerified}=await <jwt.JwtPayload> jwt.verify(refreshToken,process.env.refreshToken!);
                    console.log('refresh token verified')
                    //validate token data
                    if (foundUser.userId !==userId) throw new Error("invalid token use detected,data mismatched");

                    //since token was valid perfect now create new tokens
                    const newaccessToken=await jwt.sign({
                        userId, is_Admin,kycVerified
                    },process.env.accessToken!,{expiresIn:"900s"})
            
                    const newrefreshToken=await jwt.sign({
                        userId,is_Admin,kycVerified
                    },process.env.refreshToken!,{expiresIn:"7 days"})
            
                    //store refrehtoken 
                    foundUser.refreshToken = await [...newRefreshTokenArray, newrefreshToken];
                    await foundUser.save();
                    return {success:true,message:"refresh Token verfied Successfully",tokens:{newaccessToken,newrefreshToken},user:{userId:foundUser._id,is_Admin,img:foundUser.profileImg.imgUrl}};


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

        
export const googleLoginS=async(profileData:googleProfile):Promise<{accessToken:string,refreshToken:string,user:{userId:Types.ObjectId,is_Admin:boolean,img:string}}>=>{
    try{
        
        const{userName,email,profile_Img}=profileData
        
        const userExist=await userModel.findOne({userId:email})
        if(userExist){ 
            console.log("user with email exist")
            const{accessToken,refreshToken}=await generateTokens(email,userExist.is_Admin,userExist.kyc.is_verified);
            //push refresh token into userdb
            const tokenStored=await userExist.refreshToken.push(refreshToken);
            await userExist.save();
            console.log(userExist.profileImg);
            return {accessToken,refreshToken,user:{userId:userExist._id,is_Admin:userExist.is_Admin,img:userExist.profileImg.imgUrl}};
        }

        //since no user create new user
        const newUser=await userModel.create({
            userId:email,
            userName,
            email:{
                mail:email,
                is_verified:true
            },
            profileImg:{
                imgId:"",
                imgUrl:profile_Img
            },
            kycInfo:{
                email:email
            }
        })
        await newUser.save();
        console.log('newuser profile',newUser.profileImg)
        if(!newUser) throw new Error("new user creation failed")
        const{accessToken,refreshToken}=await generateTokens(email,newUser.is_Admin,newUser.kyc.is_verified);
            //push refresh token into userdb
        const tokenStored=await newUser.refreshToken.push(refreshToken);
        await newUser.save();

        //send welcome email to user
        console.log("before mail send function or template is passed",userName,email)
        //dont need to wait as it takes time to send mail
        sendMail(signupMailTemplate(userName,email))
        return {accessToken,refreshToken,user:{userId:newUser._id,is_Admin:newUser.is_Admin,img:newUser.profileImg.imgUrl}};
        

    }catch(e){
        console.log(e);
        throw e;
    }
}

export const facebookLoginS=async(profileData:googleProfile):Promise<{accessToken:string,refreshToken:string,user:{userId:Types.ObjectId,is_Admin:boolean,img:string}}>=>{
    try{
         //here email will contain facebook id
        const{userName,email,profile_Img}=profileData
        const userExist=await userModel.findOne({userId:email})
        if(userExist){ 
            const{accessToken,refreshToken}=await generateTokens(email,userExist.is_Admin,userExist.kyc.is_verified);
            //push refresh token into userdb
            const tokenStored=await userExist.refreshToken.push(refreshToken);
            await userExist.save();
            return {accessToken,refreshToken,user:{userId:userExist._id,is_Admin:userExist.is_Admin,img:userExist.profileImg.imgUrl}};
        }

        //since no user create new user
        const newUser=await userModel.create({
            userId:email,
            userName,
            profileImg:{
                imgId:"",
                imgUrl:profile_Img
            }
        })
        await newUser.save();
        if(!newUser) throw new Error("new user registration failed")
        const{accessToken,refreshToken}=await generateTokens(email,newUser.is_Admin,newUser.kyc.is_verified);
            //push refresh token into userdb
        const tokenStored=await newUser.refreshToken.push(refreshToken);
        await newUser.save();
        return {accessToken,refreshToken,user:{userId:newUser._id,is_Admin:newUser.is_Admin,img:newUser.profileImg.imgUrl}};
        

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
    return false;
   }
}