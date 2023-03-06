import 'server-only'
// lib/getRequestCookie.ts

import { cookies } from 'next/headers'

import axios from 'axios'
import { NextResponse } from 'next/server'


export async function verifyAuth(): Promise<boolean> {
  const res=new NextResponse()


  return true
}
