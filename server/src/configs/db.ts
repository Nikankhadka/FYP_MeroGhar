

import {connect} from "mongoose"
import {Request,Response,NextFunction} from "express"
import * as dotenv from "dotenv"
dotenv.config()
    //return type of async function is promise 
  
const dbConnect=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       // 
         await connect(`mongodb+srv://nick11444:${process.env.dbPassword}@fypnikan.bud3xcp.mongodb.net/test`)
         console.log("Database Connected")
         next()
         console.log("Next Called")
          
    }catch(e){
        console.log(e);
    }
}


export default dbConnect;


