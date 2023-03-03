
import { NextRequest,NextResponse } from "next/server";

import axios from 'axios';
import { headers } from "next/headers";


export default async function checkAuth(req:NextRequest){
    try{
        const res=NextResponse.next()
        
       
        const cookieStore=req.cookies
        const refreshToken=cookieStore.get('refreshToken')?.value
        const accessToken=cookieStore.get('accessToken')?.value
        const session=cookieStore.get('session')?.value

        if(refreshToken&&session){
            console.log("both")
            return res
        }
        if(!session){
            if(!refreshToken){
                console.log('no refresh token and session')
                return NextResponse.redirect("http://localhost:3000/login")
            }
            //if user has refresh token then send api request to verify the token data 
            const response = await axios.post(
                'http://localhost:2900/auth/v1/refreshToken',
                {},
                {
                  withCredentials: true,
                  headers: {
                    Authorization: refreshToken,
                  },
                })
                //token has expired 
            if(!response.data.success) return NextResponse.redirect("http://localhost:3000/login")
            
            //verified token and also send new tokens access and refresh token
            const cookies=response.headers['set-cookie']
            cookieStore._headers =cookies!
            cookieStore.set('accessToken',response.data.accessToken)
            cookieStore.set("refreshToken",response.data.refreshToken,)
           cookieStore.set("session",'valid')
            console.log('cookie set successfully')
           console.log(cookieStore.getAll())
            return res
        }

    }catch(e){
        console.log(e)
        NextResponse.redirect('http://localhost:3000/login')
    }
}

export const config = {
    matcher: '/user',
}