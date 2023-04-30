'use client'

import Link from 'next/link'

import Carousel from '../../../../components/carousel'
import { BookProperty } from '../../../../components/listing/booking'
import Review from '../../../../components/reviewCard'
import Wish from '../../../../components/Svg/wishSvg'
import NavBar from '../../../../components/navbar/navbar'
import { Property } from '../../../../interface/response'
import { Reservation } from './page'
import {BsHouses} from 'react-icons/bs'
import {HiOutlineMapPin} from 'react-icons/hi2'
import * as _ from 'lodash'


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
                <Wish active={inWishList} />
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
                  {_.startCase(propertyType)} Hosted by {userId}
                </h3>
              </div>

              <Link href={`/user/${userId}`} className="block" target='_blank'>
                <img
                  src="/user.png"
                  alt="user"
                  className="h-13 w-13 rounded-full p-1 ring-2 ring-gray-200"
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
          <Review />
          
        </div>}
       

        <hr className="my-8 border-gray-200" />
        {/* REViews Section */}
        <div>
          {/* header block */}
          <div className="my-8 flex items-center gap-x-2">
            <img src="/rate.png" alt="rate" className="block h-7 w-7" />
            <p className="text-lg font-bold">5.00</p>
            <p className="text-lg font-bold">76 reviews</p>
          </div>

         
          {/* grid block */}
          <div className="grid-1 grid w-full gap-10 md:grid-cols-2 ">
            {Reviews.map((items) => {
              return (
                <div className="rounded-lg p-2">
                  <div className="flex w-full items-center gap-x-3 ">
                    <img
                      src="/user.png"
                      alt="User"
                      className="block h-10 w-10"
                    />
                    <p>
                      <span className="text-md block font-bold">UserId</span>
                      <span className="text-sm text-gray-700 ">
                        Date October
                      </span>
                    </p>
                  </div>

                  <p className="my-2 flex items-center gap-x-2">
                    <img src="/rate.png" alt="rate" className="block h-7 w-7" />
                    <span className="block text-sm font-bold">5.0</span>
                  </p>
                  <p className="text-md my-3 text-gray-700">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged
                  </p>

                  {/* send api request to report this review so it can be checked by admin  can only be seen by owner*/}
                  <button className="flex items-center gap-x-2 underline">
                    <img src="/flag.png" alt="flag" className="block h-5 w-5" />
                    <span className="block text-sm font-bold text-gray-700">
                      Report Review
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>


     
    </main>
  )
}
