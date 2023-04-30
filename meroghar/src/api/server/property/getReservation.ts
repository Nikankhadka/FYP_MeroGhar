import { IBooking } from "../../../interface/response";
import Api from "../../client/axios";


import { getAccessToken } from "../auth";
  
export default async function getReservations(propertyId:string,user:string,page?:number,limit?:number){
    try {
      
  
    //   const query: any = {};
    
    // //   simply get reservation dates without revealing information about user or host
    //   if (propertyId!="") {
    //     query.propertyId =propertyId;
    //   };
  
    // //   these below will  not contian information just should not be empty
    //   if (userId!=''&&userId=='user') {
    //     query.userId = userId;
    //   }
  
    //   //kind of confusing conditionals
    //   if (hostId!=""&&hostId=='host') {
    //     query.hostId = hostId
    //   }
  
      //here depending on the api call there will be id or 
      if(propertyId!=''&&user==''){
        
        console.log('onlydates')
        const reservations=await Api.get(`/property/v1/booking/${propertyId}`,{withCredentials:false});
        if(reservations.data.success){
            return reservations.data.reservations;
        }
        throw new Error("faile to fetch data")
      }
    
      if(propertyId!=''&&user=='host'){
        const reservations=await Api.get(`/property/v1/booking/${propertyId}?page=${page}`,{withCredentials:true})
        if(reservations.data.success){
            return reservations.data.reservations;
        }
        throw new Error("failed to fetch data")
    }
      
      const reservations=await await Api.get(`/property/v1/booking/myBookings?page=${page}`,{withCredentials:true});
      if(reservations.data.success){
        return reservations.data.reservations;
    }
    throw new Error("faile to fetch data")
      //return safeReservations;
    } catch (error: any) {
      throw error;
    }
  }



  export async function getPropertyBookings(id:string):Promise<Partial<IBooking>[]>{
    try{
      
       
        const res = await fetch(
            `http://localhost:2900/property/v1/booking/propertyBooking/${id}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
          if(!res.success) throw new Error(`${res.error}`)
        
        console.log("my properties",res);
        return res.reservations;
  
        
    }catch(e){
       throw e;
  }}


  export async function getMyBookings(page:number,limit:number):Promise<Partial<IBooking>[]>{
    try{
      
       
        const res = await fetch(
            `http://localhost:2900/property/v1/booking/myBookings?page=${page}&limit=${limit}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
          if(!res.success) throw new Error(`${res.error}`)
        
        console.log("my properties",res);
        return res.reservations;
  
        
    }catch(e){
       throw e;
  }}


export async function getOnBookings(page:number,limit:number):Promise<Partial<IBooking>[]>{
    try{
      
       
        const res = await fetch(
            `http://localhost:2900/property/v1/booking/onBookings`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
        if(!res.success) throw new Error(`${res.error}`)
        
        console.log("my properties",res);
        return res.reservations;
  
        
    }catch(e){
       throw e;
  }}