
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