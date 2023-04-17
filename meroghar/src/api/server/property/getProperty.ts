
import { getAccessToken } from "../auth";


export async function getPropertyRequests(page:number,limit:number):Promise<kycRequests[]>{
    try{
      
        
        const res = await fetch(
            `http://localhost:2900/admin/v1/kycRequests`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
        if(!res.success) throw new Error("failed to fetch user information")
        
        console.log("Kyc requests",res);
        return res.propertyRequests;
  
        
    }catch(e){
       throw e;
    }
  }