import { IReview } from "../../interfaces/dbInterface";
import { propertyModel } from "../../models/property";
import { reviewModel } from "../../models/reviews";
import { userModel } from "../../models/user";



export const postReviewS=async(userId:string,id:string,reviewData:Partial<IReview>):Promise<boolean>=>{
    try{
        //check if user is actually tennant
        const propertyExist=await propertyModel.findOne({_id:id});
        if(!propertyExist) throw new Error("Invalid Property Id")

        //if not tennant 
      if(propertyExist.tennants.some((tennant)=>tennant!=userId)) throw new Error("No user allowed to Review Except tennant!");

            const newReview =await reviewModel.create({userId,propertyId:id,...reviewData,hostId:propertyExist.userId})
            if(!newReview) throw new Error("failed to post Review")

            //now update rating for user and property if overall rating is provided 
        
            //calculate newrating 
            const averageRating=(propertyExist.avgRating+newReview.rating)/(propertyExist.ratingCount+1)

            propertyExist.$inc('ratingCount',1).set('avgRating',averageRating)
            await propertyExist.save();
          


            const user = await userModel.findOne({_id:userId});
            //now change userrating
            if(user?.avgRating==0&&user?.recievedReviewcount==0){
              user.avgRating=newReview.rating;
              user.recievedReviewcount=1;
              await user.save();
              return true;
            }

            //else 
            user!.avgRating=(user!.avgRating+newReview.rating)/ 2;
            user!.recievedReviewcount=user!.recievedReviewcount+1;
            await user?.save();
            return true;

        }

      

    catch(e){
        console.log(e)
        throw e;
    }
}