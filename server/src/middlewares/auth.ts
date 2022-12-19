import { Request,Response,NextFunction } from "express";





//will receive input to verify which tokena will verify it ex:acces,refresh token secret will be imported from env
export const verifyToken=async(tokenType:string)=>{
    try{


        //return the express  middle ware to verify refresh
         if(tokenType=="refreshToken")return(req:Request,res:Response,next:NextFunction)=>{
            try{
                //get refresh token from cookie 
                if(!req.cookies.refreshToken) return res.status(401).json({success:false,message:" refresh token not found"});

                //now check the refresh token in database to find user for token reuse detection
                const refreshToken=req.cookies.refreshToken;
                


            }catch(e){
                console.log(e);
                res.status(401).json({success:false,message:"invalid request credential"})
            }
         }
       

        
    }catch(e){
        console.log(e)
    }
}

