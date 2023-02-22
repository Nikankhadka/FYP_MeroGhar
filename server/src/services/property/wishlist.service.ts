import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";


export const addPropertyWishS=async(userId:string,id:string):Promise<boolean>=>{
    try{

        const propertyExist=await propertyModel.findOne({_id:id});
        if(!propertyExist) throw new Error("Property does not exist")
        //check whether this user already has added property to wishli
        const checkWishList=await userModel.findOne({userId,wishList:id});
        if(checkWishList) throw new Error("Property already in the wishlist");

        //now add property in the users wishlist
        const updateWishList=await userModel.findOneAndUpdate({userId},{
            $push:{
                wishList:id
            }
        },{new:true})

        if(!updateWishList) throw new Error("Property failed to add in the wish List");
        return true;
    }catch(e){
        console.log(e)
        throw e;
    }
}