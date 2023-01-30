
import '../styles/globals.css'


export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className='bg-green-400'>
        
        {/* this children represents each page component  that is rendered */}
        {children}
        <p> this is footer which will be applied to all pages</p>
        </body>
    </html>
  )
}
