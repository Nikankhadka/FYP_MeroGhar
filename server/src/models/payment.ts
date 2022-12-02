import mongoose from "mongoose"

const paymentSchema=new mongoose.Schema({
        tennant_id:{type:String,required:true},
        owner_id:{type:String,required:true},
        inspection:{

        }
        property_id:{type:String,required:true},
        created_at:{type:Date,default:Date.now},
        amount:{type:Number,required:true},
})