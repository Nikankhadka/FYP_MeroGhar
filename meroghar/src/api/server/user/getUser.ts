'server-only'
import { cookies } from 'next/headers';
import { FetchedMe, FetchedUserData, IUserKyc } from "../../../interface/response";
import Api from "../../client/axios"
import { getAccessToken } from '../auth';

export async function getUser(userId:string):Promise<FetchedUserData>{
    try{
        const userData = await fetch(
            `http://localhost:2900/user/v1/getUser/${userId}`,
            {
              method: 'GET',
              credentials: 'include',
              cache:'no-store'
            }
          ).then(res=>res.json())
    
        if(!userData.success) throw new Error("failed to fetch user information")
        
        console.log("userProfile Data",userData);
        return userData.userData;

        
    }catch(e){
       throw e;
    }
}




export async function getMe():Promise<FetchedMe>{
  try{
    
      
      const userData = await fetch(
          `http://localhost:2900/user/v1/getMe`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { cookie: getAccessToken()},
            cache:'no-store',
            next:{revalidate:10}
          }
        ).then(res=>res.json())
  
      if(!userData.success) throw new Error("failed to fetch user information")
      
      console.log("userAccount Data",userData);
      return userData.userData;

      
  }catch(e){
     throw e;
  }
}



//fetch information of user whose kyc needs to be verified basic profile view by admin
export async function getUserKyc(userId:string):Promise<IUserKyc>{
  try{
    
      
      const userData = await fetch(
          `http://localhost:2900/admin/v1/getUser/${userId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { cookie: getAccessToken()},
            cache:'no-store'
          }
        ).then(res=>res.json())
  
      if(!userData.success) throw new Error("failed to fetch user information")
      
      console.log("userAccount Data",userData);
      return userData.userData;

      
  }catch(e){
     throw e;
  }
}



export interface kycRequests{
  userId:string
  userName:string,
  _id:string,
  profileImg:{
    imgUrl:string,
    imgId:string
  }
  about:string
}

export async function getKycs(page:number,limit:number):Promise<kycRequests[]>{
  try{
    
      
      const kycRequests = await fetch(
          `http://localhost:2900/admin/v1/kycRequests/?page=${page}&limit=${limit}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { cookie: getAccessToken()},
            cache:'no-store'
          }
        ).then(res=>res.json())
  
      if(!kycRequests.success) throw new Error("failed to fetch user information")
      
      console.log("Kyc requests",kycRequests);
      return kycRequests.kycRequests;

      
  }catch(e){
     throw e;
  }
}

