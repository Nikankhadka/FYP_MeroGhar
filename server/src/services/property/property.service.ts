import { Property } from "../../interfaces/dbInterface";
import { propertyModel } from "../../models/property";
import { userModel } from "../../models/user";
import throwOnEmpty from "mongoose"


//property is not crated only request is send to admin for property post verification
export const createPropertyS=async(userId:string,propertyData:Partial<Property>):Promise<boolean>=>{
    try{
        const {name,location,discription,property_type,rules,amenities,price,images}=propertyData
        const newProperty=await propertyModel.create({
            userId,
            name,
            location,
            discription,
            property_type,
            rules,
            amenities,
            price,
            images,
            is_verified:{
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

export const getPropertyS=async(id:string,userId:string):Promise<Property>=>{
    try{
        if(userId!==""){
            //check whether it is the property owner 
            const ownedProperty=await propertyModel.findOne({_id:id,userId});
            if(ownedProperty) return ownedProperty
        }
        const propertyData=await propertyModel.findOne({_id:id}).select("-tennants -tennantId -is_banned -is_verified.pending -is_verified.message -is_verified.");
        if(!propertyData) throw new Error("Proper data fetching failed")
        return propertyData;
        
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
            is_verified:{status:false,pending:true,message:"Update needs reverification"}},{new:true});
        
        
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











export const updateViewCountS=async(userId:string,propertyId:string):Promise<boolean>=>{
    try{
        //if not empty append the product into viewed product
        if(userId!==""){
            const checkViewed=await userModel.findOne({userId,viewed_property:propertyId});
            //donot update view if same user views the property
            if(checkViewed) return false;

            //now append the product
            const updateViewedProperty= await userModel.findOneAndUpdate({userId},{$push:{viewed_property:propertyId}},{new:true})
            if(!updateViewedProperty) throw new Error("view update failed")
            //now since appended check the array size of morethan 10 remove first property
            if(updateViewedProperty?.viewed_property.length! >10) {
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
        if(!updateViewCount) throw new Error("update view count failed")
        return true;

    }catch(e){
        console.log(e);
        throw e;
    }
}