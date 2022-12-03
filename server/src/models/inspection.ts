import {Schema,model} from "mongoose"

const inspectionSchema=new Schema({
    tennant_id:{type:String,required:true},
    property_id:{type:String,required:true},
    owner_id:{type:String,required:true},
    inspection_date:{type:Date,},
    inspection_time:{type:String,},


})

export const inspectionModel=model("inspection",inspectionSchema)