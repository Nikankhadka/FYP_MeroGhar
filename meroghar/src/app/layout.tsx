
import '../styles/globals.css'
import NavBar from '../components/navbar'

export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-white'>
        <NavBar />
        {/* this children represents each page component  that is rendered */}
        {children}
      
        </body>
    </html>
  )
}
