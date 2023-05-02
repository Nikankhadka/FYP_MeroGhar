import mongoose, { Types, model } from "mongoose"
import { Payment } from "../interfaces/dbInterface"

 const paymentSchema=new mongoose.Schema({
        //make string for now
        
        payerId:String,
        bookingId:{type:Types.ObjectId,ref:"Bookings"},
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

const paymentModel=model<Payment>('Payments',paymentSchema);

export default paymentModel;
