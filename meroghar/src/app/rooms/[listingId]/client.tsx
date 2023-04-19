'use client'

import Link from 'next/link'

import Carousel from '../../../components/carousel'
import { BookProperty } from '../../../components/listing/booking'
import Review from '../../../components/reviewCard'
import Wish from '../../../components/Svg/wishSvg'
import { BsFillHouseFill } from 'react-icons/bs'
import { GrMapLocation } from 'react-icons/gr'
import NavBar from '../../../components/navbar/navbar'
import { Property } from '../../../interface/response'
import { Reservation } from './page'

interface RoomProps {
  propertyData: Partial<Property>
  inWishList: boolean
  user: string
  reservations: Reservation[]
}

export function RoomClient({
  propertyData,
  inWishList,
  user,
  reservations,
}: RoomProps) {
  const {
    name,
    price,
    location,
    avg_Rating,
    rating_count,
    userId,
    property_type,
    discription,
    amenities,
    rules,
  } = propertyData
  const Reviews = ['sdafas', 'fdasfas', 'fdasfs']

  return (
    <main className="w-full  ">
      <NavBar theme="dark" authState={false} img="" Z="50" />

      <div className="my-24 mx-auto w-[95%] md:w-[80%]">
        <div>
          <h3 className="my-2 text-center text-lg font-semibold md:text-left ">
            {name}
          </h3>

          <div className="w-fll my-2 flex flex-wrap justify-between">
            <div className=" flex items-center justify-around gap-3 ">
              <p className="flex items-center">
                <img src="/rate.png" alt="rate" width={20} height={20} />
                <span className="text-md text-gray-600">{avg_Rating}</span>
              </p>

              <button className="block text-sm font-semibold underline">
                {rating_count} Reviews
              </button>
              <Link
                href="/address"
                className="block text-sm font-semibold underline"
              >
                {location?.country},{location?.state},{location?.city}
              </Link>
            </div>

            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-1 rounded-lg p-1 hover:bg-hoverColor ">
                <Wish active={inWishList} />
                <span className="text-sm font-semibold underline">save</span>
              </button>

              {user == 'owner' && (
                <Link href="#" className="text-sm font-bold underline">
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>
        <Carousel />

        {/* property Information  */}

        <div className="my-6 flex flex-col items-center justify-between md:flex-row md:items-start">
          <div className="w-[95%] md:w-[60%] ">
            <div className=" flex  w-full items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Room Hosted by {userId}
                </h3>
                <p className="my-2 text-sm">
                  Basic Amenities List 1 BedRoom 1 Bathroom
                </p>
              </div>

              <Link href="#" className="block">
                <img
                  src="/user.png"
                  alt="user"
                  className="h-12 w-12 rounded-full"
                />
              </Link>
            </div>

            <hr className="my-5 border-gray-400" />

            {/* basic property Information  */}
            <div>
              <div className="flex items-center gap-x-3 ">
                <BsFillHouseFill className="h-7 w-7" />
                <p>{property_type}</p>
              </div>

              <div className="my-4 flex items-center gap-x-3">
                <GrMapLocation className="h-7 w-7" />
                <p className="text-sm font-bold">
                  {location?.country},{location?.state},{location?.city}
                </p>
              </div>
            </div>

            <hr className="my-5 border-gray-400" />
            {/* discription */}
            <div>
              <h3 className="text-lg font-semibold text-mainColor">
                Description
              </h3>
              <p className="text-md text-gray-700">{discription}</p>
            </div>
            <hr className="my-5 border-gray-400" />

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-bold text-themeColor">Amenities</h3>
              <div className="my-2">
                {amenities!.map((items) => {
                  return (
                    <div className="my-2 flex items-center gap-x-4">
                      <p>{items}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="my-5 border-gray-400" />
            {/* for Rules */}
            <div>
              <h3 className="text-lg font-bold text-themeColor">Rules</h3>
              <p className="text-md text-gray-700">{rules![0]}</p>
            </div>
          </div>
          {/* interactive component for contacting owner */}

          <BookProperty reservations={reservations} />
        </div>

        <hr className="my-8 border-gray-400" />

        {/* review Crud component */}

        <Review />

        <hr className="my-8 border-gray-400" />

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
