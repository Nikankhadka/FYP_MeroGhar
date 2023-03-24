'use client'

import Link from "next/link"
import {RxHamburgerMenu} from 'react-icons/rx'
import SideBar from "./sidebar"
 
import {useState,useEffect,createRef} from 'react'

export default function DashboardNav(){
    
    const[openSide,setopenSide]=useState(false)
    const sideRef = createRef<HTMLDivElement>()


    useEffect(() => {
      const clickHandler = (e: any) => {
        //if event click is outsise the div ref of the modal clsoe modal
        if (!sideRef.current?.contains(e.target)) {
          setopenSide(false)
        }
      }
      document.addEventListener('mousedown', clickHandler)
  
      return () => {
        document.removeEventListener('mousedown', clickHandler)
      }
    })

    return(
        <main className=" fixed z-50 flex h-20 w-full items-center justify-between bg-white p-3  dark:bg-slate-700 shadow-md  md:hidden">
            
            <div ref={sideRef}>
            <button className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            onClick={(e)=>{
                e.preventDefault();
                setopenSide(!openSide)
            }}
            >
              <RxHamburgerMenu className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
             
            </button>

            {
            openSide&&<SideBar is_Admin={false} menu={true} ref={sideRef}/>
            }

            </div>
           
        <Link
          href="http://localhost:3000"
          className=" flex items-center gap-2  "
        >
          <img src="/airbnb.png" alt="logo" className="block h-10 w-10" />
          <span className="block font-semibold text-mainColor drop-shadow-xl dark:text-themeColor md:text-lg"> MeroGhar</span>
        </Link>
        </main>
    )
}