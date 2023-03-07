
import { NextRequest, NextResponse } from 'next/server'

//setup conditional middleware for admin and user Routes
export default async function checkAuth(req: NextRequest) {
  try {
    //simialr to express res used for setting cookie here
    const res = NextResponse.next()
    //get cookie from client header

    const cookieStore = req.cookies
    //gets path name for the request current page
    const {pathname}=req.nextUrl

    //setup condition for admin first 
    if(pathname.startsWith('/admin')) return refreshTokenS(req,res,true)
    

    //now for user as well as non user basically for all the paths other the
    
    if(pathname.startsWith('/user')) return refreshTokenS(req,res,false)
    

    //now for property routes which can be accessed by  both user and non user 
    
    const refreshToken = cookieStore.get('refreshToken')?.value
    if(!refreshToken)  return res;

    //if he has refresh token means we might need check token status role and other
    return refreshTokenS(req,res,false)
    


  } catch (e) {
    console.log(e)
    NextResponse.redirect('http://localhost:3000/login')
  }
}

// export const config = {
//   matcher:['/user','/user/property'],
// }




//token refresh function which is used by both admin and user to check token expiry and get new tokens 

const refreshTokenS=async(req:NextRequest,res:NextResponse,is_Admin:boolean)=>{
  try{
    //res can be instance of new Next but the problem is afer cookie set the page stucks so use this flow
    
    const cookieStore = req.cookies
    const refreshToken = cookieStore.get('refreshToken')?.value
    const session=cookieStore.get('session')?.value
    

    //since cookie accessed does not match the format of cookie passed in header modify it then pass as cookie so it can be parse by cookie parser
    const cookies=`refreshToken=${refreshToken}`

    if(!refreshToken) return NextResponse.redirect('http://localhost:3000/login')
    if(session){
      const sessionObj=JSON.parse(session!)
      console.log('sesObj',sessionObj)
      if (sessionObj.is_Admin==is_Admin) return res;
    }
   

     
      console.log('no session/invalid session role')

      //if user has refresh token then send api request to verify the token data
      console.log('refresh request')
      const response = await fetch(
        'http://localhost:2900/auth/v1/refreshToken',
        {
          method: 'POST',
          credentials: 'include',
          headers: { cookie: cookies},
        }
      )

      //token has expired
      if (!response.ok)
        return NextResponse.redirect('http://localhost:3000/login')

      const jsonData = await response.json()
      console.log(jsonData)

      //now we check whether the passed role mathces the user role 
      // if(is_Admin!==jsonData.user.is_Admin)  return NextResponse.redirect('http://localhost:3000')

      //verified token and also send new tokens access and refresh token

      await res.cookies.set('accessToken', jsonData.accessToken, {
        maxAge: 900,
        httpOnly: true,
      })
      await res.cookies.set('refreshToken', jsonData.refreshToken, {
        maxAge: 604800,
        httpOnly: true,
      })
      await res.cookies.set('session',JSON.stringify(jsonData.user), { maxAge: 780, httpOnly: true })

      return res  
    

  }catch(e){
    console.log(e)
  }
}