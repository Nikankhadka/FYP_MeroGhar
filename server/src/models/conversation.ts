import {Schema,model} from "mongoose"


const conversationSchema=new Schema({
    user1:String,
    user2:String,
    created_at:{
        type:Date,
        default:Date.now,
    },
    //this can be used for generating user defined bill 
    property_Id:{type:String,required:true},
    

})


//export the model instance for performing Query operations
export const conversationModel=model("Conversations",conversationSchema);


