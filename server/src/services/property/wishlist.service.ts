import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";
import { IUser } from "../../interfaces/dbInterface";



// setup condion for number of list and property per list if it is large number create different model 
export const addPropertyWishS=async(userId:string,id:string,wish:string):Promise<boolean>=>{
    try{

        const propertyExist=await propertyModel.findOne({_id:id});
        if(!propertyExist) throw new Error("Property does not exist")

        const checkpropertyOwner=await propertyModel.findOne({_id:id,userId});
        if(checkpropertyOwner) throw new Error("Property owner not allowed add owned property in wishlist")

        //check whether this user already has added property to wishli
        const checkWishList=await userModel.findOne({userId,wishList:{
            listName:wish,
            properties:id
        }});
        if(checkWishList) throw new Error("Property already in the wishlist");

        //now add property in the users wishlist
        const updateWishList=await userModel.findOneAndUpdate({userId,"wishList.listName":wish},{
            $addToSet:{
                //$ is positional operator gives index 
                "wishlist.$[wishlistObj].properties":id
            }
        },{arrayFilters: [{ "wishlistObj.listName":wish}]})

        if(!updateWishList) throw new Error("Property failed to add in the wish List");
        return true;
    }catch(e){
        console.log(e)
        throw e;
    }
}


export const getWishListS=async(userId:string):Promise<Partial<IUser>>=>{
    try{
        const wishList=await userModel.findOne({userId}).select('wishList')
        if(!wishList) throw new Error("Wish List not avialable for the given user");
        return wishList;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const getWishPropertyListS=async(userId:string,wishId:string,page:string,limit:string):Promise<Partial<IUser>>=>{
    try{
        const currentPage=parseInt(page)
        const currentLimit=parseInt(limit)

      const properties=await userModel.findOne({userId}).select("_id wishList").populate({
        path: "wishList",
        match: {_id:wishId },
        populate: {
          path: "properties",
          select:"-tennants -tennantId -is_banned -is_verified.pending -is_verified.message -is_verified.",
          options: {
            limit:currentLimit,
            skip: (currentPage- 1)*currentLimit,
          },
        },
      })

      if(!properties) throw new Error("Properties failed to fetch/Invalid WishList for the Given User")
      return properties;
      
    }catch(e){
        console.log(e)
        throw e;
    }
}


//for get property by id use same as property but return the wishlist status on response to highlight the status

export const removePropertyS=async(userId:string,id:string):Promise<boolean>=>{
    try{
        //validate property id 
        const propertyExist =await propertyModel.findOne({_id:id})
        if(!propertyExist) throw new Error("Invalid property Id/Property with the given id does not Exist!")

        //now find and remove property from the user document 
        const removeProperty=await userModel.findOneAndUpdate({userId,'wishList.properties':id},{
            $pull:{
                'wishList.$.properties':id
            }
        },{new:true});

        if(!removeProperty) throw new Error("Property remove Failed/Invalid property Credential for the user!");
        return true

    }catch(e){
        console.log(e);
        throw e;
    }
}