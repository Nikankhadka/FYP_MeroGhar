
import '../styles/globals.css'

import { cookies } from 'next/headers';

import Footer from '../../components/footer'
import ClientComp from '../../components/clientComp';




export default async function RootLayout({children}: {children: React.ReactNode}) {

  const cookieStore=cookies();
  const theme=cookieStore.get("theme")?.value||'light'
  const session=cookieStore.get("session")?.value
  let sessionObj={is_Admin:false}
  if(session){
    sessionObj=JSON.parse(session)
  }
 


  return (
    //toggle dark mode by getting dark mode from 
    <html className={theme=='dark'? 'dark':'light'}>
      <head />
      <body className={`bg-white flex flex-col`}>

        
        <ClientComp>
            
        </ClientComp>

        <div className="pb-20 pt-28">
          {children}
        </div>
        <Footer />
        
      </body>
    </html>
  )
}
