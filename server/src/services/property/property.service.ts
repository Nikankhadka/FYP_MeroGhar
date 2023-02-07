import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";

export const updateViewCountS=async(userId:string,propertyId:string):Promise<boolean>=>{
    try{
        //if not empty append the product into viewed product
        if(userId!==""){
            const checkViewed=await userModel.findOne({userId,viewed_property:propertyId});
            //donot update view if same user views the property
            if(checkViewed) return false;

            //now append the product
            const updateViewedProperty= await userModel.findOneAndUpdate({userId},{$push:{viewed_property:propertyId}},{new:true})

            //now since appended check the array size of morethan 10 remove first property
            if(updateViewedProperty?.viewed_property.length!>10) {
                updateViewedProperty?.viewed_property.shift() 
                await updateViewedProperty?.save()
            }
        }

        //now increment propery view count
        const updateViewCount=await propertyModel.updateOne({_id:propertyId},{
            $inc:{
                viewCount:1
            }
        })

        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}