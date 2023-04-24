'use client'

import { useState, useEffect, useRef } from 'react'
import InititailModalC from './navmodel'
import { createRef } from 'react'
import { ToggleButton } from '../buttons'
import Link from 'next/link'



interface NavProps {
  theme: string,
  authState:boolean,
  img:string

}




const NavBar = ({ theme,authState,img}: NavProps): JSX.Element => {
  //get auth state and pass into the initial model
  const [open, setopen] = useState(false)
  const menuRef = createRef<HTMLDivElement>()


  useEffect(() => {
    const clickHandler = (e: any) => {
      //if event click is outsise the div ref of the modal clsoe modal
      if (!menuRef.current?.contains(e.target)) {
        setopen(false)
      }
    }
    document.addEventListener('mousedown', clickHandler)

    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  })




  return (
    <nav className={`fixed z-20 flex h-20 w-full items-center justify-around bg-white p-3 shadow-none dark:bg-slate-700  md:shadow-md`} >
      {/* logoName */}

      <div className=" hidden items-center gap-1 md:flex">
        <Link
          href="/"
          className="block items-center gap-2 md:flex "
        >
          <img src="/airbnb.png" alt="logo" className="block h-10 w-10" />
        </Link>

        <Link
          href="/"
          className="block font-semibold text-mainColor drop-shadow-xl dark:text-themeColor md:text-lg"
        >
          MeroGhar
        </Link>
      </div>

      {/* search Bar */}
      <div className="  my-2 flex h-11 w-11/12 items-center gap-1 rounded-lg border-2 border-gray-200 bg-white hover:drop-shadow-md md:w-2/6 ">
        <input
          type="text"
          className="text-md h-full w-full rounded-lg p-2 shadow-lg focus:outline-mainColor"
          placeholder="   Search"
        />
        <button className=" h-full rounded-lg bg-white px-1 hover:bg-blue-100  ">
          <img src="/search.png" alt="search" className="h-6 w-6 " />
        </button>
      </div>

      {/* post and Profile */}
      <div className="hidden items-center gap-2 md:flex">
        <ToggleButton theme={theme} />
        <Link
          href="/Account/listings"
          className=" block rounded-md border-2   border-gray-200 p-2 px-3  text-gray-700 hover:border-themeColor dark:text-gray-300 md:text-sm"
        >
          Postroom
        </Link>

        <div ref={menuRef}>
          <button
            className="flex items-center gap-1  rounded-lg border-2 border-gray-200  px-2 py-1 hover:border-themeColor dark:bg-slate-300 "
            onClick={(e) => setopen(!open)}
          >
            <img src="/menu.png" alt="user" className="h-5 w-5 " />
            <img src={img==''? '/user.png':img} alt="user" className="h-8 w-8 rounded-full " />
          </button>

          {open && <InititailModalC authState={authState} ref={menuRef} />}
          
          
          {/* <LoginSignup login={true} modal={true} /> */}
            
        </div>
      </div>
      
    </nav>
  )
}

export default NavBar
