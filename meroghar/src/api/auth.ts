import 'server-only'
// lib/getRequestCookie.ts

import { cookies } from 'next/headers'

import axios from 'axios'


export async function verifyAuth(): Promise<boolean> {
  const cookieStore = cookies()
  console.log(cookieStore.getAll())
  //refresh token does not expire on client it is compulsory for auth
  const refreshTokenCookie = cookieStore.get('refreshToken')?.value

  console.log('rToken', refreshTokenCookie)
  //this is temporary cookie set in client bynext js if missing use refresh to verify and intialize new
  const sessionCookie = cookieStore.get('sessionCookie')?.value

  console.log('sessionCookie', sessionCookie)
  //since we have refresh token which is http only cookie and cant be modified no worries for that
  if (refreshTokenCookie && sessionCookie)  return true
  

  if (!sessionCookie) {
    console.log('no session cookie')
    if (!refreshTokenCookie) {
      return false
    }

    console.log('verify refresh token and get new data')
    try {
      //since we have refresh token cookie we will verify that
      const response = await axios.post(
        'http://localhost:2900/auth/v1/refreshToken',
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: refreshTokenCookie,
          },
        }
      )

      //set booth cookie from next js server in client
      if (response.data.success) {
        cookieStore.set('accessToken', response.data.accessToken)
        cookieStore.set('refreshToken', response.data.refreshToken)
        cookieStore.set('session', 'valid')
        console.log(cookieStore.getAll())
        return true
      }

      //since verification process was failed
      return false
    } catch (e) {
      return false
      console.log(e)
    }
  }
  return false
}
