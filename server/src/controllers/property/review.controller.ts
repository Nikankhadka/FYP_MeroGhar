import { Request,Response } from "express"
import { postReviewS } from "../../services/property/review.service"

export const postReviewC=async(req:Request,res:Response)=>{
    try{
        const postReview=await postReviewS(req.userData.docId,req.params.id,req.body);
        if(postReview) return res.status(200).json({success:false,message:"Review Posted successfully"})
        
    }catch(e:any){
        console.log(e)
        res.status(400).json({success:false,error:e.message})
    }
}