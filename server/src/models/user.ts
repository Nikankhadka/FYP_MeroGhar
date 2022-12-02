import {schema,model} from "mongoose"

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
        password:String,
        
        //can be manually updated or if user logs in with google then it will be updated automatically
        email:{
            mail:{type:String},
            verified:{type:Boolean,default:false}
        },
        two_FA:{
            type:Boolean,
            default:false
        },
        created_at:{
            type:Date,
            default:Date.now,
            immutable:true
        },
        //will be provided on update
        updated_at:Date,
        //will contain the token value for token rotation
        token:[String],
        is_Admin:{type:Boolean,default:false},

        //userid__profile
        profile_img:{
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
            location:{
                country:String,
                city:String,  
            },
            img:[{
                //userId_img1/2
                img_id:String,
                img_url:String
            }]

        },
        
        //kyc verification status
        verified:Boolean,

        listing:{type: Number,default:0},
        recieved_Ratingcount:{type: Number,default:0}, //when user listed property recieves a rating
        recieved_Reviewcount:{type: Number,default:0},

        //document id of refrenced product donot create new document in different collection
        wishList:[String],

        //can be modified by admin to ban user for certain time or permanently
        is_banned:{type:Number},

        

        //for recommendation colloborative information data will be rating and review 
        recommendation:[String],


        //for reset password to store and validate token thorugh email
        resetPassowrdToken:String,

})



export const userModel=model("Users",userSchema);
