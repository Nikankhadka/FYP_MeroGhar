import { Request,Response } from "express";
import { getBookingS, postBookingS,getMyBookingS, checkBookingS } from "../../services/property/booking.service";


export const postBookingC=async(req:Request,res:Response)=>{
    try{
        // check kyc verification first from req.userdata.kyc

        const newBooking=await postBookingS(req.params.id,req.userData.userId,req.body)
        if(newBooking) return res.status(200).json({success:true,message:"Property Sucessfully Booked"});
        return res.status(409).json({success:false,error: "Booking already exists for the given property and dates."})
    }catch(e:any){
        res.status(500).json({success:false,error:e.message})
    }
}

export const checkBookingC=async(req:Request,res:Response)=>{
    try{
        // check kyc verification first from req.userdata.kyc

        const bookingExist=await checkBookingS(req.params.id,req.body.startDate,req.body.endDate)
        if(!bookingExist) return res.status(200).json({success:true,message:"booking does not Exist"});
        return res.status(409).json({success:false,error: "Booking already exists for the given property and dates."})
    }catch(e:any){
        res.status(500).json({success:false,error:e.message})
    }
}

export const getBookingC=async(req:Request,res:Response)=>{
    try{

        //     console.log('getbookings')
        
        // // check kyc verification first from req.userdata.kyc
        // if(req.userData.userId==""){
        //     console.log('gg')
        //     const reservations=await getBookingS(req.params.id,"");
        //     console.log(reservations)
        //     return res.status(200).json({success:true,reservations})
        // }
        // console.log('afterres')
        // // page and limit is required for pagination and shit 
        
        const reservations=await getBookingS(req.params.id);
       
        if(reservations)  return res.status(200).json({success:true,reservations})
        return res.status(400).json({success:false,error: "Please provide proper information of Host Id and property Id"})
    }catch(e:any){
        res.status(500).json({success:false,error:e.message})
    }
}

export const getMyBookingC=async(req:Request,res:Response)=>{
    try{
        const page=Number(req.query.page);
        const limit=Number(req.query.limit||10);
        const reservations=await getMyBookingS(req.userData.userId,page,limit);
       
        if(reservations)  return res.status(200).json({success:true,reservations})
        return res.status(400).json({success:false,error: "Please provide proper information of Host Id and property Id"})
    }catch(e:any){
        res.status(500).json({success:false,error:e.message})
    }
}