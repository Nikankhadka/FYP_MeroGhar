import { IReview } from "../../interfaces/dbInterface";
import { propertyModel } from "../../models/property";
import { reviewModel } from "../../models/reviews";
import { userModel } from "../../models/user";



export const postReviewS=async(userId:string,id:string,reviewData:Partial<IReview>):Promise<boolean>=>{
    try{
        //check if user is actually tennant
        const propertyExist=await propertyModel.findOne({_id:id});
        if(!propertyExist) throw new Error("Invalid Property Id")

        //check for tennant can be check from userdoc or property since data exist on both
        const userDoc=await userModel.findOne({userId})

        // if(propertyExist.tennants.includes(userDoc!._id.toString())){
            
        //     //since value is data input is not fixed and validation is handled by middle ware simpleu use se
        //     const newReview =await reviewModel.create({userId,propertyId:id,...reviewData})
        //     if(!newReview) throw new Error("failed to post Review")

        //     //now update rating for user and property if overall rating is provided 
        //     if(newReview.overallRating!==0){
        //         //overall rating has been provided
        //         const averageRating=(propertyExist.avg_Rating+newReview.overallRating)/(propertyExist.rating_count+1)

        //         const updateProperty=await propertyModel.findOneAndUpdate({_id:id},{
        //             $inc:{rating_count:1},
        //             $set:{
        //                 avg_Rating:averageRating
        //             }
        //         },{new:true})
        //         if(!updateProperty) throw new Error("Review posted but property data update failed")

        //         //now update rating for user 
        //         if(userDoc?.avg_rating==0){
        //             userDoc.avg_rating=newReview.overallRating
        //             await userDoc.save()
                    
        //             return true;
        //         }
        //         //else
        //         userDoc!.avg_rating=(userDoc!.avg_rating+newReview.overallRating)/2
        //         await userDoc!.save()
        //         return true
        //     }

        //     //now if rating is not provided only review/comment is provided the

        // }

        //if not tennant simply throw error
        throw new Error("unAuthorized access/Only tennats/reviers are allowed to give reviews")

    }catch(e){
        console.log(e)
        throw e;
    }
}