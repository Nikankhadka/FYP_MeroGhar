import { userModel } from "../models/user";
import {hash,compare} from "bcrypt"
import dotenv from "dotenv";
dotenv.config();


const checkUser=async(userId:string)=>{
    try{
        const user=await userModel.findOne({
            userId:userId
        })
        if(user) return true;
        return false;
        

    }catch(e){
        console.log(e)
    }
}

export const registerUser=async(userId:string,password:string):Promise<boolean|undefined>=>{
    try{
        const userExist=await checkUser(userId);
        if(userExist) return false;

        //since no user create new user
        const newUser=userModel.create({
            userId:userId,
            password:await hash(password,10)
        })
        console.log(newUser);
        return true;

    }catch(e){
        console.log(e)
    }
}