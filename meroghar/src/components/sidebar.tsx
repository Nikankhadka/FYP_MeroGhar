'use client'

import Link from 'next/link'

import { HiUser,HiHeart,HiHome } from 'react-icons/hi'
import {MdManageAccounts,MdOutlineReviews} from 'react-icons/md'

import{AiFillSetting} from 'react-icons/ai'
import {RiLockPasswordFill,RiAdminFill} from 'react-icons/ri'

import{BsFillChatLeftFill} from 'react-icons/bs'
import {ImUserCheck} from 'react-icons/im'

import {BiLogOut} from 'react-icons/bi'
import { forwardRef } from 'react'
import Api from '../api/client/axios'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
interface props{
    is_Admin:boolean
    menu:boolean
}

type Ref = HTMLDivElement;

import {useState} from 'react'

// takes in role and renders some element while others dont 
const  SideBar=forwardRef<Ref,props>((props,ref):JSX.Element=>{

    const trans='-translate-x-full '
    const [account,setaccount]=useState(false)
    const router=useRouter()

  return (
      <div className={`fixed top-[80px] w-[100%] bg-slate-500 bg-opacity-50 left-0 z-20 h-screen sm:w-64  border-r-2 border-gray-200 shadow-lg transition-transform ${props.menu?'':trans} md:translate-x-0 md:top-0 md:w-[220px] lg:w-64 sm:bg-white sm:opacity-100`}
      
      >
        
        {/* content div */}
        <div className="h-full z-40 w-64 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-slate-700  sm:w-full" ref={ref}>

        <div >
            {/* content */}

   {  !props.menu&&<div >

        <Link
          href="/"
          className="my-2 flex items-center gap-2  "
        >
          <img src="/airbnb.png" alt="logo" className="block h-10 w-10" />
          <span className="block font-semibold text-mainColor drop-shadow-xl dark:text-themeColor md:text-lg"> MeroGhar</span>
        </Link>

        <hr className=" block mt-6 border-gray-400" />
      </div>
}
     

            {/* <Link
              href="/Account"
              className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Dashboard
              </span>
            </Link> */}

            <Link
              href="/Admin"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <HiUser className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Profile
              </span>
            </Link>

           {
            !props.is_Admin&&<Link
            href="/Account/wishlists"
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <HiHeart className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Wishlist
            </span>
          </Link>
           } 

            {props.is_Admin&&<Link
              href="/Admin/kycRequest"
              className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <ImUserCheck className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Kyc Requests
              </span>
            </Link>}

            {props.is_Admin&&<Link
              href="/Admin/users"
              className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <ImUserCheck className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                User List
              </span>
            </Link>}

            <Link
              href={props.is_Admin?'/Admin/listingRequest':'/Account/listings'}
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <HiHome className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Listings
              </span>
            </Link>

            {/* <Link
              href="/Account/reviews"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <MdOutlineReviews className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Reviews
              </span>
            </Link> */}

           {/* {
            !props.is_Admin&&<Link
            href="#"
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <BsFillChatLeftFill className="h-5 w-5 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Message
            </span>
          </Link>
           } */}


            

           <div className='border-2 border-slate-400 rounded-lg'>
           <button
               className="w-full group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
              onClick={(e)=>{
                e.preventDefault();
                setaccount(!account)
              }}
            >
              <AiFillSetting className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Settings
              </span>
            </button>

            {account&&<div className='w-[95%] mx-auto '>
            <Link
              href="/Account/Account-settings"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <MdManageAccounts className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Account
              </span>
            </Link>

            <Link
              href="/Account/password"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <RiLockPasswordFill className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Change Password
              </span>
            </Link>

            </div>}
           </div>
            

           


           { props.is_Admin&&<Link
              href="#"
              className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <RiAdminFill className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Add Admin
              </span>
            </Link>}

            <hr className=" my-5 border-gray-400" />
            
            <div className=''>
            
            <button
              onClick={(e)=>{
                e.preventDefault();
                const res= Api.delete('/auth/v1/logout',{withCredentials:true}).then((res)=>{
                    toast.success("User logged Out");
                    return router.push('/Home')
                }).catch((e)=>{
                  toast.success("User logged Out");
                  return router.push('/Home')
                
            })}}
              className="w-full group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <BiLogOut className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Log out
              </span>
            </button>
            </div>
            




          </div>
        </div>
      </div>
    
  )
})


SideBar.displayName = 'SideBar';

export default SideBar;