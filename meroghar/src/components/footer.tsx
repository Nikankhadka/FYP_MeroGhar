'use client'

import Link from 'next/link'
import FooterChild from './Svg/footerchild'





//footer is going to be server render
export  function PrimaryFooter(): JSX.Element {
  //check get auth state from initail root layout then conditionally render footerchild
  //path=router.patth

  return (
    <main className='fixed bg-white  bottom-0  w-full border-gray-200'>
      <footer className=" p-2 flex justify-center items-center border-2  md:hidden">
      <FooterChild page="Explore" active={false} />
      <FooterChild page="WishList" active={false} />
      <FooterChild page="Trips" active={false} />
      <FooterChild page="Inbox" active={false} />
      <FooterChild page="Profile" active={false} />
      </footer>
    </main>

  )
}



export const SecondaryFooter=()=>{
  return(
    <main className='fixed bg-white  bottom-0  w-full border-gray-200'>
    <footer className="hidden fixed bottom-0 left-0  w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-3 dark:bg-slate-700 dark:border-gray-600">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">MeroGhar</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6 text-gray-700 dark:text-gray-300">About</Link>
        </li>
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6 text-gray-700 dark:text-gray-300">Privacy Policy</Link>
        </li>
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6t ext-gray-700 dark:text-gray-300">Licensing</Link>
        </li>
        <li>
            <Link href="#" className="hover:underline text-gray-700 dark:text-gray-300">Contact</Link>
        </li>
    </ul>
</footer>
  </main>
  )
}