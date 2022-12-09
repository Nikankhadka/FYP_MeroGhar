import { userModel } from "../models/user";
import {hash} from "bcrypt"
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


export const localLogin=async(userId:string,password:string)=>{
    try{
        const user


    }catch(e){
        console.log(e)
    }
}