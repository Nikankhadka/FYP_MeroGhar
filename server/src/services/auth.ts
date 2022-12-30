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

dotenv.config();





export const registerUserS=async(userId:string,password:string):Promise<boolean>=>{
    try{
        
        const userExist=await userModel.findOne({userId:userId});
        if(userExist) return false;
       
        //since no user create new user
        const newUser=await userModel.create({
            userId:userId,
            userName:userId,
            password:await hash(password,10)
        })

        //not necessary to call but call
        await newUser.save();
        console.log(newUser._id);
        return true;

    }catch(e){
        return false;
        console.log(e)
    }
}


//define type of data this function is going to return 







export const LoginS=async(userId:string,password:string):Promise<{success:boolean,message:string,accessToken:string,refreshToken:string}>=>{
    try{
        console.log("inside login service");
        const foundUser=await userModel.findOne({userId});
        if(!foundUser) return {success:false,message:"user not regsitered",accessToken:"",refreshToken:""};
        //if string variable does not take Strig\undefined then use ! to tell typescript that it will not be undefined
        const verifiedUser=await compare(password,foundUser.password!);
        if(!verifiedUser) return {success:false,message:"invalid password",accessToken:"",refreshToken:""};
        
        //since user is been verfied 
        
         const accessToken=await jwt.sign({
            userId, is_Admin:foundUser.is_Admin
        },process.env.accessToken!,{expiresIn:"1800s"})

        const refreshToken=await jwt.sign({
            userId,is_Admin:foundUser.is_Admin
        },process.env.refreshToken!,{expiresIn:"30 days"})

        //now append refresh token to userdocument 
       const tokenStored=await foundUser.refreshToken.push(refreshToken);
        await foundUser.save();

        //throw error or return false 
        if(!tokenStored) throw new Error("token not stored in database")

        return {success:true,message:"User verified and token stored successfully",accessToken,refreshToken}

    }catch(e){
        console.log(e)
        return {success:false,message:"service query error",accessToken:"",refreshToken:""}
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
        return {success:false,tokendata:{
            userId:"",
            is_Admin:false
        }}
    }
}



//service to verify token and give new tokens back 
export const verifyRefreshTokenS=async(refreshToken:string):Promise<{success:boolean,message:string,tokens:{newaccessToken:string,newrefreshToken:string}}>=>{
        try{
            //find user with token
            const foundUser=await userModel.findOne({refreshToken})

            //if user not found token is reused or invalid 
            if(!foundUser){
                try{
                    //hacked user
                    const {userId,is_Admin} =await <jwt.JwtPayload>jwt.verify(refreshToken,process.env.refreshToken!)
                    const hackedUser=await userModel.findOne({userId,is_Admin})
                    if(!hackedUser) throw new Error("Invalid token data, user not valid")
                    //if user is hacked
                    hackedUser.refreshToken=[]
                    await hackedUser.save();
                    return {success:false,message:"invalid token use detected,user hacked",tokens:{newaccessToken:"",newrefreshToken:""}};
                }
                
                catch(e){
                    console.log(e);
                    return {success:false,message:"invalid token use detected",tokens:{newaccessToken:"",newrefreshToken:""}};
                }}

                //array to store tokens except the current token
                const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
                //since refreh token was found in userdb verify token data
                try{
                    
                    const {userId,is_Admin}=await <jwt.JwtPayload> jwt.verify(refreshToken,process.env.refreshToken!);
                    //validate token data
                    if (foundUser.userId !==userId) return {success:false,message:"invalid token use detected,data mismatched",tokens:{newaccessToken:"",newrefreshToken:""}};

                    //since token was valid perfect now create new tokens
                    const newaccessToken=await jwt.sign({
                        userId, is_Admin
                    },process.env.accessToken!,{expiresIn:"1800s"})
            
                    const newrefreshToken=await jwt.sign({
                        userId,is_Admin
                    },process.env.refreshToken!,{expiresIn:"30 days"})
            
                    //store refrehtoken 
                    foundUser.refreshToken = [...newRefreshTokenArray, newrefreshToken];
                    await foundUser.save();
                    return {success:true,message:"refresh Token verfied Successfully",tokens:{newaccessToken,newrefreshToken}};


                }catch(e){
                    //if token invalid then filter and get other token except then current token 
                    
                    foundUser.refreshToken=newRefreshTokenArray;
                    await foundUser.save();
                    return {success:false,message:"Token expired Login again",tokens:{newaccessToken:"",newrefreshToken:""}};
                }
             

        }catch(e){
            console.log(e)
            return {success:false,message:"invalid token use detected,Token expired",tokens:{newaccessToken:"",newrefreshToken:""}};
        }
       


}

        

