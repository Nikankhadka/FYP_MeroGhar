import { IBooking } from "../../interfaces/dbInterface";
import { BookingInput } from "../../interfaces/inputInterface";
import { bookingModel } from "../../models/booking";
import paymentModel from "../../models/payment";
import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";


export const checkBookingS=async(propId:string,startDate:Date,endDate:Date)=>{
  try{
    
    const checkProperty=await propertyModel.findOne({_id:propId});
    if(!checkProperty) throw new Error("invalid Property Id/Does not Exist");
    
    const existingBooking = await bookingModel.findOne({
        $and: [
          { propertyId: propId },
          {
            $or: [
              { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
              { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
              { startDate: { $gte: startDate }, endDate: { $lte: endDate } }
            ]
          }
        ]
      });
    if(existingBooking) return true;
    return false;
  }catch(e){
    console.log(e);
    throw e;
  }
}


//modify query later to only work on verified proeprty and verified user
export const postBookingS=async(propId:string,userId:string,bookingDetail:Partial<BookingInput>):Promise<boolean>=>{
    try{
        const{startDate,endDate,guest,payerId,initialAmount,serviceCharge,totalAmount,paymentId,Stay}=bookingDetail
        const checkProperty=await propertyModel.findOne({_id:propId});
        if(!checkProperty) throw new Error("invalid Property Id/Does not Exist");
        
        const existingBooking = await bookingModel.findOne({
            $and: [
              { propertyId: propId },
              {
                $or: [
                  { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
                  { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
                  { startDate: { $gte: startDate }, endDate: { $lte: endDate } }
                ]
              }
            ]
          });
        if(existingBooking) return false;
       
        const newBooking=await bookingModel.create({
            propertyId:propId,
            userId,
            hostId:checkProperty.userId,
            startDate,
            endDate,
            guest
        });

        await newBooking.save();

        //add user document id to this property ko tennant information
        const userdoc=await userModel.findOne({userId});
        const addTennant=propertyModel.findOneAndUpdate({_id:propId},{$push:{
            tennants:userdoc!._id}},{new:true});

        if(!addTennant)  throw new Error("failed to add user to tennant")
        //now also create a paymentdoc

        const newPayment=await paymentModel.create({
          bookingId:newBooking._id,
          propertyId:propId,
          payerId,
          Stay,
          paymentDate:new Date(),
          tennantId:userId,
          ownerId:checkProperty.userId,
          initialAmount,
          serviceCharge,
          totalAmount,
          id:paymentId,
        });

        await newPayment.save();
        if(!newPayment)  throw new Error("failed to store Payment Information");

      return true

    }catch(e){
        console.log(e);
        throw e;
    }
}


export const getBookingS=async(propId:string):Promise<Partial<IBooking>[]>=>{
    try{
      //   console.log("ins serbce") userId:string,page?:number,limit?:number

      //  if(userId!=''){
      //   const reservations=await bookingModel.find({propertyId:propId,hostId:userId}).skip((page! - 1) * limit!)
      //   .limit(limit!);
      //   if(!reservations) throw new Error("Failed to Fetch reservation for user");
      //   return reservations;
      //  }

       const reservations=await bookingModel.find({
        propertyId:propId
       }).select('startDate endDate').exec();

       if(!reservations) throw new Error("failed to get Reservation details");

       return reservations;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const getMyBookingS=async(userId:string,page?:number,limit?:number):Promise<Partial<IBooking>[]>=>{
    try{
        const reservations=await bookingModel.find({userId}).skip((page! - 1) * limit!)
        .limit(limit!);
        if(!reservations) throw new Error("Failed to Fetch reservation for user");
        return reservations;
     
    }catch(e){
        console.log(e);
        throw e;
    }
}