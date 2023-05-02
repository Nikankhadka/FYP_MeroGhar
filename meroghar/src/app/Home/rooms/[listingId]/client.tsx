'use client'

import Link from 'next/link'

import Carousel from '../../../../components/carousel'
import { BookProperty } from '../../../../components/listing/booking'
import Review from '../../../../components/review'
import Wish from '../../../../components/Svg/wishSvg'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { Property } from '../../../../interface/response'
import { Reservation } from './page'
import {BsHouses} from 'react-icons/bs'
import {HiOutlineMapPin} from 'react-icons/hi2'
import * as _ from 'lodash'
import { AiFillStar } from 'react-icons/ai'
import ReviewCard from '../../../../components/reviewCard'


interface RoomProps {
  propertyData: Partial<Property>
  inWishList: boolean
  user: string
  reservations: Reservation[],
  is_Admin:boolean
}

export function RoomClient({
  propertyData,
  inWishList,
  user,
  reservations,
  is_Admin
}: RoomProps) {
  const {
    images,
    name,
    rate,
    country,
    state,
    city,
    avgRating,
    ratingCount,
    userId,
    propertyType,
    discription,
    amenities,
    rules,
    _id
  } = propertyData
  const Reviews = ['sdafas', 'fdasfas', 'fdasfs']

  return (
    <main className="w-full bg-white ">
    
      <div className=" mx-auto w-[95%] md:w-[82%]">
        <div>
          <h3 className=" text-lg md:text-xl font-semibold text-left ">
            {_.startCase(name)}
          </h3>

          <div className="w-full  flex gap-y-2 flex-wrap justify-between">
            <div className=" flex items-center justify-around gap-3 ">
              


              <Link
                href="/address"
                className="block text-sm font-semibold underline"
              >
                {country},{state},{city}
              </Link>
            </div>

            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-1 rounded-lg p-1 hover:bg-hoverColor ">
                <Wish active={inWishList} id={_id!} user={user}/>
                <span className="text-sm font-semibold underline">Save</span>
              </button>

              {user == 'owner' && (
                <Link href="#" className="text-sm font-semibold underline">
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>

        <Carousel images={images!}/>

        {/* property Information  */}

        <div className="my-6 flex flex-col items-center justify-between md:flex-row md:items-start">
          <div className="w-[95%] md:w-[60%] ">

            <div className=" flex  my-3 w-full items-center justify-between">
              <div>
                <h3 className=" text-md md:text-lg font-semibold">
                  {_.startCase(propertyType)} Hosted by {userId?.userName}
                </h3>
              </div>

              <Link href={`/Home/user/${userId?._id}`} className="block" target='_blank'>
                <img
                  src={`${userId?.profileImg?.imgUrl}`}
                  alt="userProfile"
                  className="h-14 w-14 rounded-full  border-2 border-gray-300"
                />
              </Link>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* basic property Information  */}
            <div>
              <div className="flex items-center gap-x-3 ">
                <BsHouses className="h-7 w-7" />
                <p className="text-sm font-semibold">{_.startCase(propertyType)}</p>
              </div>

              <div className="my-4 flex items-center gap-x-3">
                <HiOutlineMapPin className="h-7 w-7" />
                <p className="text-sm font-semibold">
                  {country},{state},{city}
                </p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />
            {/* discription */}
            <div>
              <h3 className=" text-md md:text-lg font-semibold text-black">
                Description
              </h3>
              <p className="text-sm sm:text-md mt-2 text-gray-800 ">{_.startCase(discription)}</p>
            </div>
            <hr className="my-8 border-gray-200" />

            {/* Amenities */}
            <div>
              <h3 className="text-md md:text-lg font-semibold text-black">What this place offers</h3>
              <div className="my-1">
                {amenities!.map((items) => {
                  return (
                    <div className="my-1 flex items-center gap-x-4">
                      <p className='text-sm sm:text-md text-gray-700 '>{items}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="my-8 border-gray-200" />
            {/* for Rules */}
            <div>
              <h3 className="text-lg font-semibold text-black">Rules</h3>
              <p className="text-sm sm:text-md text-gray-700">{_.startCase(rules![0])}</p>
            </div>
          </div>
          {/* interactive component for contacting owner */}

          {!is_Admin&&<BookProperty reservations={reservations} user={user} propertyData={propertyData} is_Admin={is_Admin} />}
        </div>

        {user=='tennant'&&<div>
        <hr className="my-8 border-gray-200" />
          <ReviewCard />
          
        </div>}
       

        <hr className="my-10 border-gray-200" />
        {/* REViews Section */}
        <div>
          {/* header block */}
          <div className="my-8 flex items-center gap-x-2">
           <AiFillStar className='h-5 w-5 mt-1' />
            <p className="text-lg sm:text-xl font-semibold">{avgRating}</p>
            <p className=" text-lg sm:text-xl font-semibold">{ratingCount} reviews</p>
          </div>

         
          {/* grid block */}
          <div className="grid-1 grid w-full gap-10 md:grid-cols-2 ">
            {Reviews.map((items) => {
              return (
                <Review />
              )
            })}
          </div>
        </div>
      </div>


     
    </main>
  )
}
