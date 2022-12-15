import { userModel } from "../models/user";
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

type tokenData={
    userId:string,
    is_Admin:boolean
}





export const Login=async(userId:string,password:string):Promise<boolean|tokenData|undefined>=>{
    try{
        console.log("inside login service");
        const foundUser=await userModel.findOne({userId:userId});
        if(!foundUser) return false;
        //if string variable does not take Strig\undefined then use ! to tell typescript that it will not be undefined
        const verifiedUser=await compare(password,foundUser.password!);
        if(!verifiedUser) return false;
        const data:tokenData={
            userId:foundUser.userId,
            is_Admin:foundUser.is_Admin
        }
        return data;

    }catch(e){
        console.log(e)
        return false;
    }
}

//service to evaluate refresh token rotation 

 export const storeToken=async(token:string,userId:string):Promise<boolean|undefined>=>{
    try{
        const queryStatus=await userModel.updateOne({userId},{$push:{refreshToken:token}});
        console.log("token successfully stored");
        if(queryStatus) return true;

    }catch(e){  
        console.log(e)
        return false;
    }
 }