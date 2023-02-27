import { Request,Response } from "express";
import { addPropertyWishS, getWishListS,getWishPropertyListS, removePropertyS } from "../../services/property/wishlist.service";


export const addPropertyWishC=async(req:Request,res:Response)=>{
    try{
        const addWishList=await addPropertyWishS(req.userData.userId,req.params.id,req.params.wishList);
       if(addWishList) return res.status(200).json({success:true,message:"property added to wish list successfully"})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}

export const getWishListC=async(req:Request,res:Response)=>{
    try{
        const wishList=await getWishListS(req.userData.userId);
        if(wishList) return res.status(200).json({success:true,wishList})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}

export const getWishPropertyListC=async(req:Request,res:Response)=>{
    try{
        const page:string=req.query.page as string
        const limit:string=req.query.limit as string
        const wishList=await getWishPropertyListS(req.userData.userId,req.params.wishId,page,limit);
        if(wishList) return res.status(200).json({success:true,wishList})
    }catch(e:any){
        console.log(e);
        res.status(400).json({success:false,error:e.message})
    }
}


export const removeProperyC=async(req:Request,res:Response)=>{
    try{
        const propertyRemove=await removePropertyS(req.userData.userId,req.params.propertyId)
        if(propertyRemove) return res.status(200).json({success:true,message:`Property ${req.params.propertyId} removed successfully from the wishlist`})
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}