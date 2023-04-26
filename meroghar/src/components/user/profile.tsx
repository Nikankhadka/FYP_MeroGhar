'use client'

import { FiUserCheck, FiUserMinus } from 'react-icons/fi'
import { HiStar, HiMinus } from 'react-icons/hi'

import { HiCheck } from 'react-icons/hi'
import { EditBasic } from './editProfile'
import { useState } from 'react'
import Link from 'next/link'
import Card from '../card/card'
import { FetchedMe, FetchedUserData } from '../../interface/response'
import { bg } from '../../styles/variants'
import useAccount from '../../customHoooks/AccountState'
import AccountComponent from './account'
import Password from './pasword'
interface ProfileProps {
  userId: string
  profileData: Partial<FetchedMe>
}

export default function Profile({ userId, profileData }: ProfileProps) {
  const {
    profileImg,
    kycInfo,
    email,
    kyc,
    about,
    listingCount,
    recievedReviewcount,
    avgRating,
    createdAt,
    userName,
    password
  } = profileData

    const account=useAccount();

  return (
    <main className='my-5'>
      <div className={`${bg} rounded-lg`}>
        
        <div className="flex flex-wrap-reverse items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Hi, I am {userName}</h2>
            <p className="my-1 text-sm font-semibold text-gray-700">
              Joined in {new Date(createdAt!).getFullYear()}{' '}
            </p>
          </div>
          <img
            src={profileImg!.imgUrl == '' ? '/user.png' : profileImg!.imgUrl}
            alt="user"
            className="my-2 h-[100px] w-[100px] rounded-full border-2 border-gray-300 p-1 shadow-lg md:h-[150px] md:w-[150px]"
          />
        </div>

        <div className="my-3 flex flex-col gap-2">
         

          <div className="my-2 flex items-center gap-x-2">
            {kyc!.isVerified ? (
              <FiUserCheck className="h-6 w-6 stroke-themeColor  " />
            ) : (
              <FiUserMinus className="h-6 w-6 stroke-themeColor  " />
            )}
            <span className="block">Identity Verified</span>
          </div>

          <div className="flex items-center gap-x-2 ">
            <HiStar className="h-6 w-6 fill-themeColor" />
            <span>{recievedReviewcount} Reviews</span>
            {recievedReviewcount! > 0 && (
              <Link href="#" className="text-sm font-semibold underline">
                {' '}
                Show all reviews
              </Link>
            )}
          </div>

          <div className="flex items-center gap-x-2 ">
            <HiStar className="h-6 w-6 fill-themeColor" />
            <span>{avgRating} Average Rating</span>
          </div>
        </div>
        <hr className="my-5 border-gray-400" />

        <div className=" my-5  flex  items-center justify-around ">
          <div className="flex items-center gap-x-2 ">
            {kyc!.isVerified ? (
              <HiCheck className="h-6 w-6 fill-themeColor" />
            ) : (
              <HiMinus className="h-6 w-6 fill-themeColor" />
            )}
            <span>Identity</span>
          </div>

          <div className="flex items-center gap-x-2 ">
            {email!.isVerified ? (
              <HiCheck className="h-6 w-6 fill-themeColor" />
            ) : (
              <HiMinus className="h-6 w-6 fill-themeColor" />
            )}
            <span>Email</span>
          </div>

          <div className="flex items-center gap-x-2 ">
            {kycInfo!.phoneNumber ? (
              <HiCheck className="h-6 w-6 fill-themeColor" />
            ) : (
              <HiMinus className="h-6 w-6 fill-themeColor" />
            )}
            <span>Phone Number</span>
          </div>
        </div>

        <hr className="my-5 border-gray-400" />

        <div className='w-full  flex gap-x-1 sm:gap-x-3 '>
            {userId == profileData._id! && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  account.onOpen('profile')
                }}
                className={`mb-2 p-2 block text-left text-sm text-gray-600 font-semibold ${account.openComponent=='profile'?'border-b-2 border-themeColor text-black':'border-b-2 border-white transition-all hover:border-themeColor hover:text-black '}`}
              >
                Edit Profile
              </button>
            )}
            {userId == profileData._id! && (
              <button
              onClick={(e) => {
                e.preventDefault()
                account.onOpen('account')
              }}
                className={`mb-2 p-2 block text-left text-sm text-gray-600 font-semibold ${account.openComponent=='account'?'border-b-2 border-themeColor text-black':'border-b-2 border-white transition-all hover:border-themeColor hover:text-black '}`}
              >
                Account-Settings
              </button>
            )}

          {userId == profileData._id!&&password&&(
                        <button
                        onClick={(e) => {
                          e.preventDefault()
                          account.onOpen('password')
                        }}
                          className={`mb-2 p-2 block text-left text-sm text-gray-600 font-semibold ${account.openComponent=='password'?'border-b-2 border-themeColor text-black':'border-b-2 border-white transition-all hover:border-themeColor hover:text-black '}`}
                      >
                          Password
                        </button>
            )}


          </div>

         {/* this all will not be rendered on  */}
         {account.openComponent=='close'&& (
          <div className="my-2 w-[95%] p-2 md:w-[80%]">
            <h2 className="my-2 text-lg font-semibold">About</h2>
            <p className="text-md rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-700 shadow-lg">
              {about ? about : '..................'}
            </p>
          </div>
        )}

       
      </div>

      {account.openComponent=='profile'&&<div className={`${bg} my-2 rounded-lg`}>
        
        
          <EditBasic
            img={profileImg!.imgUrl}
            userName={userName!}
            about={about!}
          />
        
      </div>}

     {account.openComponent=='account'&&<div className='my-3'>
      <AccountComponent  userData={profileData}/>
      </div>}

      {account.openComponent=='password'&&<div className='my-3'>
        <Password />
      </div>}


    </main>
  )
}
