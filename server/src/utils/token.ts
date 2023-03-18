import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv"
dotenv.config()


 export const generateTokens=async(userId:string,is_Admin:boolean,kycVerified:boolean):Promise<{accessToken:string,refreshToken:string}>=>{
    try{
        const accessToken=await sign({
            userId, is_Admin,kycVerified
        },process.env.accessToken!,{expiresIn:"900s"})

        const refreshToken=await sign({
            userId,is_Admin,kycVerified
        },process.env.refreshToken!,{expiresIn:"7 days"})

        return {accessToken,refreshToken}

    }catch(e){
        console.log(e);
        throw e
    }
}