export default function RootLayout({children}: {children: React.ReactNode}) {


  return (
    <html>
      <head />
      <body>
        <nav> this is global nav bar that will be used i application</nav>
        {children}</body>
    </html>
  )
}
