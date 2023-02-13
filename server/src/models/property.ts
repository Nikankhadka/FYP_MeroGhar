import {Schema,model, Types} from "mongoose"
import { Property } from "../interfaces/dbInterface";


const propertySchema=new Schema({
    _id:Types.ObjectId,
    userId:{type:String,required:true},

    //this will be default generated
    name:{type:String,required:true},
    url:String,
    location:{
        city:String,
        area:String,
        required:true,
    },
    discription:{type:String,required:true},
    property_type:{type:String,required:true},
    
    rules:[String],
    amenities:[String],
    price:Number,
    images:[{
        img_id:String,
        img_url:String
    }],

    //id of previus tennats
    tennants:{
        type:[{type:Schema.Types.ObjectId,ref:"Users"}],
        default:undefined
    },
    current_tennant:Types.ObjectId,
   
    rating_count:{type:Number,default:0},
    viewCount:{type:Number,default:0},
    avg_Rating:{type:Number,default:0},


    //admin can bacn the post
    is_banned:{type:Boolean,default:false,message:String},

    //admin verification check
    is_verified:{
        status:Boolean,
        pending:Boolean,
        message:String,
        approvedBy:String
    },

    //for recommendation it will be updated on write operation of simialr product content based
    recommendation:{
        type:[Types.ObjectId],
        default:undefined
    } //store refrenced similar product
})


//export the model instance for performing Query operations
 export const propertyModel=model<Property>("Properties",propertySchema);

