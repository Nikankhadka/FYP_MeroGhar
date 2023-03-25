
import '../styles/globals.css'
import NavBar from '../components/navbar'
import { cookies } from 'next/headers';

import Footer from '../components/footer'
import AdminNav from '../components/DashboardNav';
import DashboardNav from '../components/DashboardNav';


//seup conditional root layout for admin and normal user so only url for somethings might differ

const getUser=async()=>{
  try{
    const cookieStore=cookies();
    const accessToken=cookieStore.get("accessToken")?.value;
    const cookiedata=`acessToken=${accessToken}`
    const response = await fetch(
      'http://localhost:2900/user/v1/userData',
      {
        method: 'GET',
        credentials: 'include',
        headers: { cookie: cookiedata},
      }).then(res=>res.json())

      console.log(response)

      if(response.success){
        return response
      }

      return false;
      
  }catch(e){
    console.log(e)
    return false
  }
}


export default async function RootLayout({children}: {children: React.ReactNode}) {

  const cookieStore=cookies();
  const theme=cookieStore.get("theme")?.value||'light'
  const session=cookieStore.get("session")?.value
  let sessionObj={is_Admin:false}
  if(session){
    sessionObj=JSON.parse(session)
  }
 
  // const user=await getUser()

  

  return (
    //toggle dark mode by getting dark mode from 
    <html className={theme=='dark'? 'dark':'light'}>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white flex flex-col'>
        

        {/* conditionally render navbar  */}
        
        
        {/* this children represents each page component  that is rendered */}
        {children}
        <Footer />
        
      </body>
    </html>
  )
}
