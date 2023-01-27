
import '../styles/globals.css'
export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      <body>
        <nav> this is global nav bar that will be used i application</nav>
        {/* this children represents main page that is rendered */}
        {children}
        <p> this is footer which will be applied to all pages</p>
        </body>
    </html>
  )
}
