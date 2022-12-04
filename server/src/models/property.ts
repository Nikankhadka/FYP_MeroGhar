import {Schema,model} from "mongoose"


const propertySchema=new Schema({
    userId:{type:String,required:true},
    //this will be default generated
    _id:{type:String,required:true},
    name:{type:String,required:true},
    url:String,
    location:[String],
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
    tennants:[String],

   
    rating_count:{type:Number,default:0},
    viewCount:{type:Number,default:0},
    avg_Rating:{type:Number,default:0},


    //admin can bacn the post
 is_banned:{type:Boolean,default:false},

 //admin verification check
 is_verified:{type:Boolean,default:false},

    //for recommendation it will be updated on write operation of simialr product content based
 recommendation:[String] //store refrenced similar product
})


//export the model instance for performing Query operations
 export const propertyModel=model("properties",propertySchema);

