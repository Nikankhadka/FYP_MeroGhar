import { Types } from "mongoose";
import { Property } from "../../interfaces/dbInterface";
import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";
import { bookingModel } from "../../models/booking";



//property is not crated only request is send to admin for property post verification
export const createPropertyS=async(_id:string,propertyData:Partial<Property>):Promise<boolean>=>{
    try{
        console.log('imagges',propertyData)
        const newProperty=await propertyModel.create({
            ...propertyData,
            userId:_id,
            isVerified:{
            status:false,
            pending:true,
            message:""
            }
        })

        await newProperty.save(); 
        if(!newProperty) throw new Error("Property post failed")
        return true;
    }catch(e){
        console.log(e);
        throw e;
    }
}



export const getPropertyByIdS=async(id:string,userId:string):Promise<{property:Property,user:string,inWishList:boolean}>=>{
    try{
        if(userId!==""){
            console.log("indie user",userId)
            //check whether its a previous tennent 
            const userdocument=await userModel.findOne({_id:userId});


            const propertyData=await propertyModel.findOne({_id:id}).select("-tennants -tennantId -is_banned -is_verified");
            if(!propertyData) throw new Error("No property with the given id")
            
            //check whether property is in wishlist of the user
            const inWishList = userdocument!.wishList?.some((wish)=>wish.toString()==id) ?? false;


            if(propertyData?.tennants?.includes(userdocument!._id?.toString()) ?? false) return {property:propertyData,user:"tennant",inWishList}

            //check whether it is the property owner 
            const ownedProperty=await propertyModel.findOne({_id:id,userId});
            if(ownedProperty) return {property:ownedProperty,user:"owner",inWishList};

            //now for normal user/admin 
            if(userdocument?.is_Admin){
                return {property:propertyData,user:"admin",inWishList}
            }
            
            return {property:propertyData,user:"user",inWishList}

            
        }
        console.log("no user inside service")
        const propertyData=await propertyModel.findOne({_id:id}).select("-tennants -tennantId -is_banned  -is_verified");
        if(!propertyData) throw new Error("Proper data fetching failed")
        return {property:propertyData,user:"",inWishList:false};
        
    }catch(e){
        console.log(e)
        throw e;
    }
}


//get properties for a  userid
export const getMyPropertiesS=async(page:string,limit:string,userId:string):Promise<Property[]>=>{
    try{
        //since all admin have access to this simply fetch unverified property set in pending
        const newLimit=parseInt(limit);
        const newPage=parseInt(page) 
        const properties=await propertyModel.find({userId}).select('-tennants -tennantId ').limit(newLimit*1).skip((newPage-1)*newLimit).sort({createdAt:1})
        if(!properties) throw new Error("No property listedby the user")
        return properties

    }catch(e){
        console.log(e)
        throw e;
    }

}

export const getPropertiesS=async(page:string,limit:string):Promise<Property[]>=>{
    try{
        //since all admin have access to this simply fetch unverified property set in pending
        const newLimit=parseInt(limit);
        const newPage=parseInt(page) 
        const properties=await propertyModel.find({}).sort({ avgRating: -1, ratingCount: -1, viewCount: -1,createdAt: -1 })
        .select('-tennants').limit(newLimit*1).skip((newPage-1)*newLimit);
        if(!properties) throw new Error("No properties rightNow");
        return properties

    }catch(e){
        console.log(e)
        throw e;
    }

}





export const updatePropertyS=async(userId:string,id:string,updateData:Partial<Property>):Promise<Property>=>{
    try{
        //check property ownership before modification 
        const checkProperty=await propertyModel.findOne({_id:id,userId})
        if(!checkProperty) throw new Error("Invalid request credential/unAuthorized user");

        //now update the property information 
        const updatedProperty=await propertyModel.findOneAndUpdate({_id:id,userId},{...updateData,
        isVerified:{status:false,pending:true,message:"Update needs reverification"}},{new:true});
        
        
       /* updatedProperty!.is_verified.status=false,
        updatedProperty!.is_verified.pending=true,
        updatedProperty!.is_verified.message="Property updated so need Reverification"**/

        if(!updatedProperty) throw new Error("Property Update Failed")
        return updatedProperty

    }catch(e){
        console.log(e);
        throw e;
    }
}





export const deletePropertyS=async(userId:string,propertyId:string):Promise<boolean>=>{
    try{
        const checkProperty=await propertyModel.findOne({_id:propertyId,userId});
        if(!checkProperty) throw new Error("Invalid Delete Request/No property with the User exist");


        //check if booking for the property exist if then cant delete 
        const currentDate = new Date();
        const bookingExist=await bookingModel.findOne({
            propertyId,
            $or: [
                {
                    startDate: {$gt: currentDate},
                    endDate: {$gt: currentDate},
                },
                {
                    startDate: {$lt: currentDate},
                    endDate: {$gte: currentDate},
                },
            ],
        }).exec();

        if(bookingExist) throw new Error("Property cant be removed/Booking Exist");
        
        //now delete
        const deleteProperty=await propertyModel.findOneAndDelete({_id:propertyId,userId});
        if(!deleteProperty) throw new Error("Propery Delete failed");

        //now property delete so decrease listing count from user profile
        const decreaseCount=await userModel.updateOne({userId},{
            $inc:{
                listingCount:-1
            }
        })

        //also decrese ratinf rating-1/2 and also rating count 

        if(!decreaseCount) throw new Error("Propety deleted failed to decrease listing count");

        return true;
    }catch(e){
        console.log(e);
        throw e;
    }
}





export const updateViewCountS=async(userId:string,propertyId:string):Promise<boolean>=>{
    try{
        //if not empty append the product into viewed product
        if(userId!==""){

            //check if its property owner then dont count 
            const propertyOwner=await propertyModel.findOne({_id:propertyId,userId});
            if(propertyOwner) return false;
            
            const checkViewed=await userModel.findOne({_id:userId,viewedProperty:propertyId});
            //donot update view if same user views the property
            if(checkViewed) return false;

            //now append the product
            const updateViewedProperty= await userModel.findOneAndUpdate({_id:userId},{$push:{viewedProperty:propertyId}},{new:true})
            if(!updateViewedProperty) throw new Error("view update failed")
            //now since appended check the array size of morethan 10 remove first property
            if(updateViewedProperty.viewedProperty.length! >10) {
                updateViewedProperty?.viewedProperty.shift() 
                await updateViewedProperty?.save()
            }
        }

        //now increment propery view count
        const updateViewCount=await propertyModel.updateOne({_id:propertyId},{
            $inc:{
                viewCount:1
            }
        })
        if(!updateViewCount) throw new Error("update view count failed")
        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}