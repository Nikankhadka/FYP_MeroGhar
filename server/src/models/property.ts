import {Schema,model, Types, SchemaTypes} from "mongoose"
import { Property } from "../interfaces/dbInterface";


const propertySchema=new Schema({

    //if id is defined in schema u need to pass on intialize in manually
    // _id:{
    //     type:Types.ObjectId,
    //     required:false
    // },
    userId:{type:String,required:true,immutable:true},

    //this will be default generated
    name:{type:String,required:true},
    url:String,
    location:{
        country:String,
        state:String,
        city:String,

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
        default:[]
    },
    
    tennantId:Schema.Types.ObjectId,

    //calculate these on write
    rating_count:{type:Number,default:0},
    viewCount:{type:Number,default:0},
    avg_Rating:{type:Number,default:0},

    //admin can bacn the post
    is_banned:{type:Boolean,default:false,message:String},

    //admin verification check
    is_verified:{
        status:{
            type:Boolean,
            default:false
        },
        pending:Boolean,
        message:String,

        //can be string or obj id can modify later
        approvedBy:String
    },

    //for recommendation it will be updated on write operation of simialr product content based
    recommendation:{
        type:[{type:Types.ObjectId}],
        default:undefined
    } //store refrenced similar product
})


//export the model instance for performing Query operations
 export const propertyModel=model<Property>("Properties",propertySchema);

