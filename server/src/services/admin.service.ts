import { userModel } from "../models/user";
import {hash} from "bcrypt"
import { IUser } from "../interfaces/dbInterface";


export const registerAdminS=async(userId:string,password:string):Promise<boolean>=>{
    try{
        
        const userExist=await userModel.findOne({userId:userId});
        if(userExist) throw new Error("User with id Already Exist,please enter new userId")
       
        //since no user create new user
        const newUser=await userModel.create({
            userId:userId,
            userName:userId,
            password:await hash(password,process.env.salt_rounds!),
            is_Admin:true
        })

        //not necessary to call but call
        await newUser.save();
        console.log(newUser._id);
        return true;

    }catch(e){
        console.log(e)
        throw e
        
    }
}


export const getKycRequestsS=async(userId:string):Promise<IUser>=>{
    try{
        //chekck if array of request exist and there are post requests to be verified
        
        const checkRequests=await userModel.findOne({userId});
        if(checkRequests?.kycVerificationRequests==undefined||checkRequests.kycVerificationRequests.length==0) throw new Error("No kyc request in the present")

        //since not empty or undefined
        const kycRequests=await userModel.findOne({userId},"_id kycVerificationRequests").populate("kycVerificationRequests",{path:"Users",select:"kycInfo"})
        if(!kycRequests) throw new Error("Failed to Fetch Kyc requests")
        return kycRequests;
    }catch(e){
        console.log(e)
        throw e
    }
}