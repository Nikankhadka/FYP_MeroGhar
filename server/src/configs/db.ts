

import {connect} from "mongoose"


    //return type of async function is promise 
    
const dbConnect=async()=>{
    try{
         await connect('mongodb://localhost:27017/FypMeroghar')
         console.log("Database Connected")
          
    }catch(e){
        console.log(e);
    }
}


export default dbConnect;


