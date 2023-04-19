
import { Property } from "../../../interface/response";
import { getAccessToken } from "../auth";



//for admin verificationnpm
export async function getPropertyRequests(page:number,limit:number):Promise<Partial<Property>[]>{
    try{
      
        
        const res = await fetch(
            `http://localhost:2900/admin/v1/propertyRequests?page=${page}&limit=${limit}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
        if(!res.success) throw new Error("failed to fetch Property Requests")
        
        console.log("Kyc requests",res);
        return res.propertyRequests;
  
        
    }catch(e){
       throw e;
    }
  }



export async function getMyProperties(page:number,limit:number):Promise<Partial<Property>[]>{
    try{
      
        
        const res = await fetch(
            `http://localhost:2900/property/v1/myProperties?page=${page}&limit=${limit}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
        if(!res.success) throw new Error("failed to fetch Property Requests")
        
        console.log("my properties",res);
        return res.propertyData;
  
        
    }catch(e){
       throw e;
    }}



export async function getPropertyById(id:string):Promise<{property:Partial<Property>,user:string,inWishList:boolean}>{
      try{
        
          console.log(getAccessToken());
          const res = await fetch(
              `http://localhost:2900/property/v1/getProperty/${id}`,
              {
                method: 'GET',
                credentials: 'include',
                headers: { cookie: getAccessToken()},
                cache:'no-store'
              }
            ).then(res=>res.json())
      
          if(!res.success) throw new Error("failed to fetch Property data")
          
          console.log("my properties",res);
          return res.propertyData;
    
          
      }catch(e){
         throw e;
      }}