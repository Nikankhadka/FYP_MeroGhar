

import {connect} from "mongoose"
import {Request,Response,NextFunction} from "express"


    //return type of async function is promise 
    
const dbConnect=async(req:Request,res:Response,next:NextFunction)=>{
    try{
         await connect('mongodb://localhost:27017/FypMeroghar')
         console.log("Database Connected")
         next()
          
    }catch(e){
        console.log(e);
    }
}


export default dbConnect;


