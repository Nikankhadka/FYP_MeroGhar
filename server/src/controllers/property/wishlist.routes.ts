import { Request,Response } from "express";
import { addPropertyWishS } from "../../services/property/wishlist.service";


export const addPropertyWishC=async(req:Request,res:Response)=>{
    try{
        const addWishList=await addPropertyWishS(req.userData.userId,req.params.id);
       if(addWishList) return res.status(200).json({success:true,message:"property added to wish list successfully"})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}