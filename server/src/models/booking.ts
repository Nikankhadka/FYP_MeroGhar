import {Schema,model,Types} from "mongoose"
import { IBooking } from "../interfaces/dbInterface"

const bookingSchema=new Schema({
    userId:{type:String,required:true},
    propertyId:{type:Types.ObjectId,required:true},
    hostId:{type:String,required:true},
    createdAt:{
        type:Date,
        default:Date.now,
        immutable:true
    },
    startDate:Date,
    endDate:Date,
    guest:String
    

    //like pending or verified something like that
    //inspesction_status:{type:String,required:true},

})

export const bookingModel=model<IBooking>("inspection",bookingSchema)