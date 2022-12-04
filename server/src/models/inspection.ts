import {Schema,model} from "mongoose"

const inspectionSchema=new Schema({
    user_id:{type:String,required:true},
    property_id:{type:String,required:true},
    host_id:{type:String,required:true},
    inspection_date:{type:Date},
    

    //like pending or verified something like that
    inspesction_status:{type:String,required:true},

})

export const inspectionModel=model("inspection",inspectionSchema)