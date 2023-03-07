'use client'

import Link from 'next/link'
import FooterChild from './Svg/footerchild'





//footer is going to be server render
export default function Footer(): JSX.Element {
  //check get auth state from initail root layout then conditionally render footerchild
  //path=router.patth

  return (
    <main className="fixed bg-white  bottom-0 z-[1000] w-full border-gray-200 p-3 flex justify-center items-center border-2  md:hidden">
      <FooterChild page="Explore" active={false} />
      <FooterChild page="WishList" active={false} />
      <FooterChild page="Trips" active={false} />
      <FooterChild page="Inbox" active={false} />
      <FooterChild page="Profile" active={false} />
    </main>
  )
}
