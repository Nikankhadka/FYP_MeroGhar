import { userModel } from "../models/user";
declare module 'jsonwebtoken' {
    export interface JwtPayload {
       userId: string,
       is_Admin:boolean
   }
}
import * as jwt from "jsonwebtoken"

import {hash,compare} from "bcrypt"
import dotenv from "dotenv";

dotenv.config();






export const registerUser=async(userId:string,password:string):Promise<boolean>=>{
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







export const Login=async(userId:string,password:string):Promise<{success:boolean,message:string,accessToken:string,refreshToken:string}>=>{
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
        },"ss@3%&*HHJJ**",{expiresIn:"1800s"})

        const refreshToken=await jwt.sign({
            userId,is_Admin:foundUser.is_Admin
        },"ss@3%&*H%%BBHH&&**",{expiresIn:"30 days"})

        //now append refresh token to userdocument 
       const tokenStored=await foundUser.refreshToken.push(refreshToken);
        foundUser.save();

        //throw error or return false 
        if(!tokenStored) throw new Error("token not stored in database")

        return {success:true,message:"User verified and token stored successfully",accessToken,refreshToken}

    }catch(e){
        console.log(e)
        return {success:false,message:"service query error",accessToken:"",refreshToken:""}
    }
}







//service layer to verify token along with user in db
export const verifyAccessTokenS=async(token:string,tokenSecret:string):Promise<{success:boolean,tokendata:jwt.JwtPayload}>=>{
    try{
        
        //if token is expire or error here it will be cathced and handled
       const {userId,is_Admin}=await <jwt.JwtPayload>jwt.verify(token,tokenSecret)
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