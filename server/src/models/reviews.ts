import {Schema,model, Types} from "mongoose"
import { IReview } from "../interfaces/dbInterface";


//document for eeach review wiill be generated
const reviewSchema=new Schema({
        userId:{type:String,required:true},
        propertyId:{type:Types.ObjectId,required:true},
        rating:{
        property:Number,
        host:Number,
        value:Number
        },
        overallRating:{
                type:Number,
                default:0
        },
        review:{type:String,default:''},
        //this will allow adming to review and ban the user if possible only allowed to post by owner
        report:{
           status:Boolean,
           message:String,
           
           //for admin to review whether to delete or leave it as it is also provide feed back to comment
           admin:String,
           adminReview:String
        },
        created_At:{type:Date,default:Date.now},
      
})

//export the model instance for performing Query operations
 export const reviewModel=model<IReview>("Reviews",reviewSchema);

