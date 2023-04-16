
import '../styles/globals.css'
import NavBar from '../components/navbar/navbar'
import { cookies } from 'next/headers';

import  { PrimaryFooter, SecondaryFooter } from '../components/footer'
import AdminNav from '../components/navbar/DashboardNav';
import DashboardNav from '../components/navbar/DashboardNav';
import { Nunito } from 'next/font/google'
import ClientComp from '../components/clientComp';
import Modal from '../components/modals/modal';
import { LoginModal } from '../components/modals/loginModal';
import { RegisterModal } from '../components/modals/registerModal';

import ToasterProvider from '../components/toast/toastProvider';
import { ConfirmModal } from '../components/modals/confirmModal';
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

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({children}: {children: React.ReactNode}) {

  const cookieStore=cookies();
  const theme=cookieStore.get("theme")?.value||'light'
  const session=await cookieStore.get("session")?.value
  let sessionObj={is_Admin:false}
  // if(session){
  //   sessionObj=JSON.parse(session)
  // }
 
  // const user=await getUser()

  
  // conditionally render navbar nad footer 

  return (
    //toggle dark mode by getting dark mode from 
    <html className={theme=='dark'? 'dark':'light'}>
      <head />
      {/* body sets the root layout for entire application */}
      <body className={`bg-slate-100 flex flex-col ${font.className}`}>
        

        {/* conditionally render navbar  */}
      
        <ClientComp>

          {/* this component are kind of hassle donot repeat them on other layouts since they have shared state 
          overlapping will cause modal to bug and close  on click since they are in root layout they are rendered through out the 
          application */}
          <ToasterProvider />
           <LoginModal />
           <RegisterModal />
           <ConfirmModal />
          
           
        </ClientComp>
        
        {/* this children represents each page component  that is rendered */}
        {children}
        <PrimaryFooter />
        
        
      </body>
    </html>
  )
}
