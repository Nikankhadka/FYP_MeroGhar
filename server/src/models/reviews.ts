import {Schema,model} from "mongoose"


//document for eeach review wiill be generated
const reviewSchema=new Schema({
        userId:{type:String,required:true},
        property_id:{type:String,required:true},
        rating:{type:Number},
        review:{type:String},

        //this will allow adming to review and ban the user if possible
        report:{type:Boolean,required:true},
        created_At:{type:Date,default:Date.now},
      
})

//export the model instance for performing Query operations
 export const reviewModel=model("Reviews",reviewSchema);

