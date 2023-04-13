'server-only'

import { FetchedUserData } from "../../../interface/response";
import Api from "../../client/axios"


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