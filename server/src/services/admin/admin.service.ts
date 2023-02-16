import { userModel } from "../../models/user";
import {hash} from "bcrypt"
import { IUser, Property } from "../../interfaces/dbInterface";
import { verifyKyc } from "../../interfaces/admin";
import { propertyModel } from "../../models/property";


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
        if(!newUser) throw new Error("User failed to register")
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
        const kycRequests=await userModel.findOne({userId},"_id kycVerificationRequests").populate("kycVerificationRequests",{path:"Users",select:"_id userName profile_Img kycInfo"})
        if(!kycRequests) throw new Error("Failed to Fetch Kyc requests")
        return kycRequests;
    }catch(e){
        console.log(e)
        throw e
    }
}


export const verifyKycRequestsS=async(adminId:string,id:string,kycData:verifyKyc):Promise<boolean>=>{
    try{
        //perform action according to verification status 
        if(kycData.isVerified){
            //check if the user has kyc info and not empty
            const checkKycData=userModel.findOne({_id:id,kycInfo:{$exist:true,$ne:{}}});
            if(!checkKycData) throw new Error("Invalid id and Misuse of admin detected")

            //since admin has verified and data is also valid now update the userDocument 
            const verifyUser=await userModel.updateOne({_id:id},{
                "$set":{
                    "kyc.is_Verified":true,
                    "kyc.message":"KYC information valid",
                    "kyc.approvedBy":adminId
                }
            })
            if(!verifyUser) throw new Error("user not able to verify")
        }

        
        if(!kycData.isVerified){
            //since admin deemed kyc info to be invalid just provide the message to the user 

            //just make sure the user account is not verified
            const userCheck=await userModel.findOne({_id:id,kyc:{is_Verified:true}})
            if(userCheck) throw new Error("User cant be done unverified since User is already verified")

            const declineUser=await userModel.updateOne({_id:id},{
                "$set":{
                    "kyc.is_Verified":false,
                    "kyc.message":kycData.message,
                    "kyc.approvedBy":adminId
                }
            })
            if(!declineUser) throw new Error("User kyc Decline failed")
        }

        //the default task would be clear admin kyc request either way 
        const deleteKycRequests=await userModel.updateMany({is_Admin:true},{
            "$pull":{
                "kycVerificationRequests":id
            }
        })

        if(!deleteKycRequests) throw new Error("Kyc Request delete failed")
        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}



export const getPropertyRequestsS=async():Promise<Property[]>=>{
    try{
        //since all admin have access to this simply fetch unverified property set in pending 
        const propertyRequests=await propertyModel.find({is_verified:{status:false,pending:true}})
        if(!propertyRequests) throw new Error("No property to be verified right now")
        return propertyRequests

    }catch(e){
        console.log(e)
        throw e;
    }

}

export const verifyPropertyRequestsS=async(adminId:string,propertyId:string,status:boolean,message:string):Promise<boolean>=>{
    try{

        //if kyc is to be unverifed just update the document 
        if(!status){
            const declineProperty=await propertyModel.updateOne({_id:propertyId},{
                "$set":{
                    "is_verified.status":status,
                    "is_verified.pending":false,
                    "is_verified.message":message,
                    "is_verified.approvedBy":adminId
                }})

            if(!declineProperty) throw new Error("Property decline failed");
            return true;
        }

        
        const verifyProperty=await propertyModel.findOneAndUpdate({_id:propertyId},{
            "$set":{
                "is_verified.status":status,
                "is_verified.pending":false,
                "is_verified.message":message,
                "is_verified.approvedBy":adminId
            }})

        if(!verifyProperty) throw new Error("Property verification failed");

        //increase the property post count for user
          const updateCount=await userModel.updateOne({userId:verifyProperty.userId},{
            "$inc":{
                listing_Count:1
            }
          })

          if(!updateCount) throw new Error("Property verified but failed to update user posting count")
        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}