import mongoose, { Types, model } from "mongoose"
import { Payment } from "../interfaces/dbInterface"

 const paymentSchema=new mongoose.Schema({
        //make string for now
        userId:{type:Types.ObjectId,ref:"Users"},
        payerId:String,
        bookingId:{type:Types.ObjectId,ref:"Bookings"},
        propertyId:{type:Types.ObjectId,ref:"Properties"},
        paymentDate:{type:Date,default:Date.now},
        initialAmount:Number,
        serviceCharge:Number,
        totalAmount:Number,
        stay:Number,
        id:String,

        // will contain bill image from cloudinary
        // billImg:String,
        // billId:String, 
},{timestamps:true})

const paymentModel=model<Payment>('payments',paymentSchema);

export default paymentModel;
