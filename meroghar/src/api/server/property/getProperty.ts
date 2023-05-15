
import { SearchForm } from "../../../components/modals/searchModal";
import { Property } from "../../../interface/response";
import { getAccessToken } from "../auth";

import qs from "query-string";


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


//use this to get properties of a owner
export async function getMyProperties(userId:string,page:number,limit:number):Promise<Partial<Property>[]>{
    try{
      
        
        const res = await fetch(
            `http://localhost:2900/property/v1/myProperties/${userId}?page=${page}&limit=${limit}`,
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




export async function getProperties(page:number,limit:number,queryParams:SearchForm):Promise<Partial<Property>[]>{
        try{
          
          //check transform query params into url string 
         
          const url = qs.stringifyUrl({
            url: 'http://localhost:2900/property/v1/getProperty',
            query:{page,limit,...queryParams},
          }, { skipNull: true });


          console.log("Query params and data url",url)

            console.log(getAccessToken());
            const res = await fetch(
                url,
                {
                  method: 'GET',
                  credentials: 'include',
                  headers: { cookie: getAccessToken()},
                  cache:'no-store',
                  
                }
              ).then(res=>res.json())
        
            if(!res.success) throw new Error("failed to fetch Property data")
            
            console.log("my properties",res);
            return res.propertyData;
      
            
        }catch(e){
           throw e;
        }

}