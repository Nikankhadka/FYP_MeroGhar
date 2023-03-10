'use client'

import Link from 'next/link'
import FooterChild from './Svg/footerchild'





//footer is going to be server render
export default function Footer(): JSX.Element {
  //check get auth state from initail root layout then conditionally render footerchild
  //path=router.patth

  return (
    <main className='fixed bg-white  bottom-0 z-[1000] w-full border-gray-200'>
      <footer className=" p-3 flex justify-center items-center border-2  md:hidden">
      <FooterChild page="Explore" active={false} />
      <FooterChild page="WishList" active={false} />
      <FooterChild page="Trips" active={false} />
      <FooterChild page="Inbox" active={false} />
      <FooterChild page="Profile" active={false} />
      </footer>

      
      <footer className="hidden fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-slate-600 dark:border-gray-600">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
     
    </main>

  )
}
