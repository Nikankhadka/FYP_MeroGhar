import {Schema,model,Types} from "mongoose"
import { IBooking } from "../interfaces/dbInterface"

const bookingSchema=new Schema({
    userId:{type:Types.ObjectId,ref:"Users",required:true},
    propertyId:{type:Types.ObjectId,ref:"Properties",required:true},
    hostId:{
        type:Types.ObjectId,
        ref:"Users",
        required:true
    },
    status:{
        type: String,
        enum: ['booked', 'cancelled','completed'],
        default: 'booked'
    },
    startDate:Date,
    endDate:Date,
    guest:Number,
   paymentId:{type:Types.ObjectId,ref:"Payments"},

    //check in and check out  
    checkInStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'ownerConfirmed', 'tenantConfirmed'],
      default: 'pending',
    },
    checkOutStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected','ownerConfirmed','tenantConfirmed'],
      default: 'pending',
    }


    //like pending or verified something like that
    //inspesction_status:{type:String,required:true},

},{timestamps:true})

export const bookingModel=model<IBooking>("Booking",bookingSchema)


  