
import '../styles/globals.css'
import NavBar from '../components/navbar'
import { cookies } from 'next/headers';

import Footer from '../components/footer'




export default async function RootLayout({children}: {children: React.ReactNode}) {

  const cookieStore=cookies();
  const  theme=cookieStore.get("theme")?.value||''
  
  return (
    //toggle dark mode by getting dark mode from 
    <html className={theme=='dark'? 'dark':'light'}>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white flex flex-col'>
        

        <NavBar />
        {/* this children represents each page component  that is rendered */}
        {children}
        <Footer />
        
      </body>
    </html>
  )
}
