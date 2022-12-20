import { userModel } from "../models/user";
import { sign,verify } from "jsonwebtoken";
import {hash,compare} from "bcrypt"
import dotenv from "dotenv";
dotenv.config();




export const registerUser=async(userId:string,password:string):Promise<boolean|undefined>=>{
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
        
         const accessToken=await sign({
            userId, is_Admin:foundUser.is_Admin
        },"ss@3%&*HHJJ**",{expiresIn:"1800s"})

        const refreshToken=await sign({
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

