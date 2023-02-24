
import '../styles/globals.css'
import NavBar from '../components/navbar'
import InititailModal from '../components/navmodel'
import LoginSignupModal from '../components/loginSignupModal'
import Footer from '../components/footer'
export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white flex flex-col'>
        <NavBar />
        <InititailModal authState={true} />
       
        {/* this children represents each page component  that is rendered */}
        {children}
        <Footer />
        </body>
    </html>
  )
}
