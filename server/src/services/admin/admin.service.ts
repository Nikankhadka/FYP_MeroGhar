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


export const getUserKycS=async(id:string):Promise<Partial<IUser>>=>{
    try{
    
        const userData=await userModel.findOne({$or:[{_id: id },{ userId:id }]}).select("-password -token  -refreshToken  -is_Admin -wishList  -viewedProperty  ");
        if(!userData) throw new Error("Failed to fetch userData")
        return userData;
    }catch(e){
        console.log(e)
        throw e;    
    }
}




// paginated kyc requests
export const getKycRequestsS=async(page:string,limit:string):Promise<IUser[]>=>{
    try{

        const newlimit=parseInt(limit)
        const newpage=parseInt(page)

        //since all admin have access to this simply fetch unverified property set in pending  .limit(newlimit*1).skip((newpage-1)*newlimit).sort({userId:"asc"}).
        const kycRequests=await userModel.find({"kyc.isVerified":false,"kyc.pending":true}).select('userId userName _id profileImg about').sort({userId:"asc",createdAt:-1}).skip((newpage-1)*newlimit).limit(newlimit*1);
        if(!kycRequests) throw new Error("No user need to be verified right now")
        return kycRequests

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
                    "kyc.isVerified":true,
                    "kyc.message":"KYC information valid",
                    "kyc.approvedBy":adminId,
                    'kyc.pending':false
                }
            })
            if(!verifyUser) throw new Error("user not able to verify")

            return true;
        }

        
        
            //since admin deemed kyc info to be invalid just provide the message to the user 

            //just make sure the user account is not verified
            const userCheck=await userModel.findOne({_id:id,kyc:{isVerified:true}})
            if(userCheck) throw new Error("User cant be done unverified since User is already verified")

            const declineUser=await userModel.updateOne({_id:id},{
                "$set":{
                    "kyc.isVerified":false,
                    "kyc.message":kycData.message,
                    "kyc.approvedBy":adminId,
                    'kyc.pending':false
                }
            })
            if(!declineUser) throw new Error("User kyc Decline failed")
        
            return true;
        //the default task would be clear admin kyc request either way 
        // const deleteKycRequests=await userModel.updateMany({is_Admin:true},{
        //     "$pull":{
        //         "kycVerificationRequests":id
        //     }
        // })

        // if(!deleteKycRequests) throw new Error("Kyc Request delete failed")
       

    }catch(e){
        console.log(e);
        throw e;
    }
}



export const getPropertyRequestsS=async(page:string,limit:string):Promise<Property[]>=>{
    try{
        //since all admin have access to this simply fetch unverified property set in pending
        const newLimit=parseInt(limit);
        const newPage=parseInt(page) 
        const propertyRequests=await propertyModel.find({'isVerified.status': false, 'isVerified.pending': true}).select('-tennants ').limit(newLimit*1).skip((newPage-1)*newLimit).sort({userId:"asc"})
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
                    "isVerified.status":status,
                    "isVerified.pending":false,
                    "isVerified.message":message,
                    "isVerified.approvedBy":adminId
                }})

            if(!declineProperty) throw new Error("Property decline failed");
            return true;
        }

        
        const verifyProperty=await propertyModel.findOneAndUpdate({_id:propertyId},{
            "$set":{
                "isVerified.status":status,
                "isVerified.pending":false,
                "isVerified.message":message,
                "isVerified.approvedBy":adminId,
            }})

        if(!verifyProperty) throw new Error("Property verification failed");

        //increase the property post count for user
          const updateCount=await userModel.updateOne({userId:verifyProperty.userId},{
            "$inc":{
                listingCount:1
            }
          })

          if(!updateCount) throw new Error("Property verified but failed to update user posting count")
        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}