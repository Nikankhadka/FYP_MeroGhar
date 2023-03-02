import 'server-only'
// lib/getRequestCookie.ts

import { cookies} from 'next/headers';


import axios from 'axios';

export async function verifyAuth(){

    const cookieStore=cookies()
    console.log(cookieStore.getAll())
    //refresh token does not expire on client it is compulsory for auth
    const refreshTokenCookie=cookieStore.get("refreshToken")?.value
    
    console.log("rToken",refreshTokenCookie)
    //this is temporary cookie set in client bynext js if missing use refresh to verify and intialize new
    const sessionCookie=cookieStore.get("sessionCookie")?.value
    
    console.log('sessionCookie',sessionCookie)
    //since we have refresh token which is http only cookie and cant be modified no worries for that
    if(refreshTokenCookie&&sessionCookie){
        return true;
    }

    if(!sessionCookie){
        console.log("no session cookie")
        if(!refreshTokenCookie){
            return false
        }

        console.log("verify refresh token and get new data")
        //since we have refresh token cookie we will verify that 
      const response=await fetch("http://localhost:2900/auth/v1/refreshToken",{
        method:"POST",
        credentials:'include',
        
      })

      console.log(response.data)
    }

}