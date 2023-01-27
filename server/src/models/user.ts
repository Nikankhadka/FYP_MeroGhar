import {Schema,model} from "mongoose"

const userSchema=new Schema({

    //the length and pattern for the properties below will be validated in the client side so no need for server side error handling

        userId:{
            type:String,
            required:true,
            unique:true
        },
        //usename in default can be user id and acts as display name 
        userName:{
            type:String,
            required:true,
        },
        //only necessary for local login
        password:{type:String},
        
        //can be manually updated or if user logs in with google then it will be updated automatically
        email:{
            mail:{type:String},
            is_verified:{type:Boolean,default:false}
        },
        Token:{
            token:String,
            tokenExpiry:Date
        },

        two_FA:{
            type:Boolean,
            default:false
        },
        two_FA_token:String,
        created_At:{
            type:Date,
            default:Date.now,
            immutable:true
        },
        //will be provided on update
        updated_At:{
            type:Date,
            default:Date.now
        },
        //will contain the token value for token rotation
        refreshToken:[String],
        is_Admin:{type:Boolean,default:false},

        //userid__profile
        profile_Img:{
            img_id:String,
            img_url:String
        },
        kyc:{
            firstName:String,
            lastName:String,
            gender:String,

            // if email is verified then this will be automatically updated
            email:String,
            phoneNumber:Number,
            address:{
                country:String,
                city:String,  
            },
            //multiple images of user, citizenship for manual verification
            img:{
                type:[{
                    //userId_img1/2
                    img_id:String,
                    img_url:String
                }],
                default:undefined
            }

        },
        
        //kyc verification status
        kyc_Verified:{type:Boolean,default:false},

        //no of property posted by user
        listing_Count:{type: Number},

        //rating and review count will be updated on write every time user property is reviewd
        avg_rating:{type: Number}, 
        recieved_Reviewcount:{type: Number},

        //document id of refrenced product donot create new document in different collection
        wishList:{
            type:[{type:Schema.Types.ObjectId,ref:"properties"}],
            default:undefined
        }
        ,
           
        

        //can be modified by admin to ban user for certain time or permanently
        is_banned:{
            strikes:Number,
            banTime:Date
        },

        rented_property:{
            type:[{type:Schema.Types.ObjectId,ref:"properties"}],
            default:undefined
        },

        //for recommendation colloborative information data will be rating and review 
        recommendation:{
            type:[String],
            default:undefined
        },


        

})



export const userModel=model("Users",userSchema);
