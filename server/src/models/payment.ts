import mongoose, { Types, model } from "mongoose"
import { Payment } from "../interfaces/dbInterface"

 const paymentSchema=new mongoose.Schema({
        //make string for now
        tennantId:String,
        payerId:String,
        ownerId:{type:String,required:true},
        propertyId:{type:String,required:true},
        paymentDate:{type:Date,default:Date.now},
        initialAmount:Number,
        serviceCharge:Number,
        totalAmount:Number,
        stay:Number,
        bookingId:Types.ObjectId,
        id:String,

        // will contain bill image from cloudinary
        // billImg:String,
        // billId:String, 
})

const paymentModel=model<Payment>('payments',paymentSchema);

export default paymentModel;
