
import '../styles/globals.css'
import NavBar from '../components/navbar'
import InititailModal from '../components/navmodel'

import Footer from '../components/footer'




export default async function RootLayout({children}: {children: React.ReactNode}) {


  
  return (
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white flex flex-col'>
        

       
        {/* this children represents each page component  that is rendered */}
        {children}
        \
        
        </body>
    </html>
  )
}
