
import { NextRequest, NextResponse } from 'next/server'

//setup conditional middleware for admin and user Routes
export default async function checkAuth(req: NextRequest) {
  try {
    //res can be instance of new Next but the problem is afer cookie set the page stucks so use this flow
    const res = NextResponse.next()
    const cookieStore = req.cookies
    const refreshToken = cookieStore.get('refreshToken')?.value
    const session = cookieStore.get('session')?.value

    //since cookie accessed does not match the format of cookie passed in header modify it then pass as cookie so it can be parse by cookie parser
    const cookies=`refreshToken=${refreshToken}`

    if (refreshToken && session) {
      console.log('both')
      return NextResponse.next()
    }

    if (!session) {
      console.log('no session')
      if (!refreshToken) {
        console.log('no refresh token and session')
        return res
      }
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
        return res

      const jsonData = await response.json()
      console.log(jsonData)

      //verified token and also send new tokens access and refresh token

      await res.cookies.set('accessToken', jsonData.accessToken, {
        maxAge: 900,
        httpOnly: true,
      })
      await res.cookies.set('refreshToken', jsonData.refreshToken, {
        maxAge: 604800,
        httpOnly: true,
      })
      await res.cookies.set('session', 'valid', { maxAge: 780, httpOnly: true })

      return res
      
    }
  } catch (e) {
    console.log(e)
    NextResponse.redirect('http://localhost:3000/login')
  }
}

// export const config = {
//   matcher:['/user','/user/property'],
// }
