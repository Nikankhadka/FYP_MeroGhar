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
            guest,
            
        });

        await newBooking.save();
       
        //now also create a paymentdoc

        const newPayment=await paymentModel.create({
          bookingId:newBooking._id,
          payerId,
          Stay,
          paymentDate:new Date(),
          initialAmount,
          serviceCharge,
          totalAmount,
          id:paymentId,
        });

        await newPayment.save();

        //now modify the booking doc to store payment id 
         newBooking.paymentId=newPayment._id;
         await newBooking.save()
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
      console.log('inside getbooking',propId)
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
      console.log("inside my bookings service")
        const reservations=await bookingModel.find({userId}).skip((page! - 1) * limit!)
        .limit(limit!).populate('propertyId','-tennants').populate('paymentId').populate('userId','_id userName profileImg userId').sort({createdtAt:1}).exec()
        if(!reservations) throw new Error("Failed to Fetch reservation for user");
        return reservations;
     
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const getOnBookingS=async(hostId:string,page?:number,limit?:number):Promise<Partial<IBooking>[]>=>{
  try{
      const reservations=await bookingModel.find({hostId}).skip((page! - 1) * limit!)
      .limit(limit!).populate("propertyId").populate('userId','_id userName profileImg userId').populate('paymentId').exec();
      if(!reservations) throw new Error("Failed to Fetch reservation for user");
      return reservations;
   
  }catch(e){
      console.log(e);
      throw e;
  }
}

export const confirmCheckInS=async(userId:string,bookingId:string):Promise<boolean>=>{
  try{
      
      const booking=await bookingModel.findOne({_id:bookingId,hostId:userId})
      if(!booking) throw new Error("invalid booking id")

      if(booking.checkInStatus) throw new Error ("Check in status True Verified!");

      booking.checkInStatus=true;
      await booking.save();
      return true;
  }catch(e){
      console.log(e);
      throw e;
  }
}

export const confirmCheckOutS=async(userId:string,bookingId:string):Promise<boolean>=>{
  try{
      
    const booking=await bookingModel.findOne({_id:bookingId,hostId:userId})
    if(!booking) throw new Error("invalid booking id")

    if(!booking.checkInStatus) throw new Error ("First verify check In");
    if(booking.checkOutStatus) throw new Error ("ALready Checked Out!");

    booking.checkOutStatus=true;
    booking.status='Completed'
    await booking.save();

    //now simply add user to the tennats list in the property 
    const tennantExist=await propertyModel.findOne({_id:booking.propertyId,tennants:booking.userId});
    if(tennantExist) return true;

    const newTennant=await propertyModel.findOneAndUpdate({_id:booking.propertyId},{
      $push:{
        tennants:booking.userId
      }
    },{new:true});

    if(!newTennant) throw new Error("failed to add tennat after checkout");
    return true
    
  }catch(e){
      console.log(e);
      throw e;
  }
}

//when booking completes then tennant is added onto the property information
// const addTennant=propertyModel.findOneAndUpdate({_id:propId},{$push:{
//   tennants:userdoc!._id}},{new:true});
 //add user document id to this property ko tennant information
//  const userdoc=await userModel.findOne({userId});
       
// if(!addTennant)  throw new Error("failed to add user to tennant")