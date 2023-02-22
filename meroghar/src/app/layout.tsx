
import '../styles/globals.css'
import NavBar from '../components/navbar'
import InititailModal from '../components/model'
import LoginSignupModal from '../components/loginSignupModal'

export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white'>
        <NavBar />
        <InititailModal />
        <LoginSignupModal />
        {/* this children represents each page component  that is rendered */}
        {children}
      
        </body>
    </html>
  )
}
