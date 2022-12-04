import mongoose from "mongoose"

 export const paymentSchema=new mongoose.Schema({
        tennant_id:{type:String,required:true},
        owner_id:{type:String,required:true},
        property_id:{type:String,required:true},
        payment_Date:{type:Date,default:Date.now},
        amount:{type:Number,required:true},
})
