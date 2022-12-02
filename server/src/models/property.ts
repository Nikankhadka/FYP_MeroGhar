import {Schema,model} from "mongoose"





const propertySchema=new Schema({
    owner_id:{type:String,required:true},
    name:{type:String,required:true},
    summary:{type:String,required:true},
    property_type:{type:String,required:true},
    
    rules:[String],
    amenities:[String],
    price:String,
    images:[{
        img_id:String,
        img_url:String
    }],

    
    listing_type:{type:String},
    rating_count:{type:Number,default:0},
    view_count:{type:Number,default:0},
    
 is_banned:{type:Boolean,default:false},
 is_verified:{type:Boolean,default:false},

    //for recommendation it will be updated on write operation of simialr product content based
    recommendation:[String] //store refrenced similar product
})


//export the model instance for performing Query operations
 export const propertyModel=model("properties",propertySchema);

