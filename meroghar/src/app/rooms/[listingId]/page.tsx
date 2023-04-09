import Link from 'next/link'

import Carousel from '../../../components/carousel'
import { BookProperty } from '../../../components/listing/booking'
import Review from '../../../components/reviewCard'
import Wish from '../../../components/Svg/wishSvg'

import NavBar from '../../../components/navbar/navbar'
import getReservations from '../../../api/server/property/getReservation'
import ClientComp from '../../../components/clientComp'

// type Params = {
//   params: {
//     listingId: string
//   }
// }
// { params: { listingId }}:params

interface IParams{
  listingId?:string,
}

interface Reservation{
  startDate:Date,
  endDate:Date
}

export default async function Room({params}:{params:IParams}) {

  // since get resevation can be used for multiple cases betrter to pass entire param obj
  
    const reservations:Reservation[]= await getReservations('64147e0b3f7adb1886790bfe','');
    console.log(reservations)
 
  
  


  console.log('room id',params.listingId )

  const Amenities = ['room', 'wifi', 'Ac', 'Tv']
  const Reviews = ['room', 'wifi', 'Ac', 'Tv']  
  return (
    <main className="w-full  ">
        <NavBar theme="dark" authState={false}  img='' Z='50'/>

        <div className='my-24 mx-auto w-[95%] md:w-[80%]'>

        <div >
        <h3 className="my-2 text-center text-lg font-semibold md:text-left ">
          Property/Room Name Tiltle Goes Here
        </h3>

        <div className="w-fll my-2 flex flex-wrap justify-between">
          <div className=" flex items-center justify-around gap-3 ">
            <p className="flex items-center">
              <img src="/rate.png" alt="rate" width={20} height={20} />
              <span className="text-md text-gray-600">5.0</span>
            </p>

            <button className="block text-sm font-semibold underline">
              76 Reviews
            </button>
            <Link
              href="/address"
              className="block text-sm font-semibold underline"
            >
              Country,City
            </Link>
          </div>

        <div className='flex items-center gap-x-3'>
        <button className="flex items-center gap-1 rounded-lg p-1 hover:bg-hoverColor ">
            <Wish active={false} />
            <span className="text-sm font-semibold underline">save</span>
          </button>

          <Link href='#' className='underline text-sm font-bold'>Edit</Link>
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
                Room Hosted by NikanKhadka
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" block h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p>House</p>
            </div>

            <div className="my-4 flex items-center gap-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-sm font-bold">Country , City, Area</p>
            </div>
          </div>

          <hr className="my-5 border-gray-400" />
          {/* discription */}
          <div>
            <h3 className="text-lg font-bold text-themeColor">Description</h3>
            <p className="text-md text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
          </div>
          <hr className="my-5 border-gray-400" />

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-bold text-themeColor">Amenities</h3>
            <div className='my-2'>
              {Amenities.map((items) => {
                return (
                  <div className='flex items-center gap-x-4 my-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-7 w-7 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

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
            <p className="text-md text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
          </div>
        </div>
        {/* interactive component for contacting owner */}
        <ClientComp>
        <BookProperty reservations={reservations}/>
        </ClientComp>
       
      </div>

      <hr className="my-8 border-gray-400" />
      
      {/* review Crud component */}

      <ClientComp>
      <Review />
      </ClientComp>
    

      <hr className="my-8 border-gray-400" />

      {/* REViews Section */}
      <div>
        {/* header block */}
        <div className='flex items-center gap-x-2 my-8'>
          <img src="/rate.png" alt="rate" className='block w-7 h-7' />
          <p className='text-lg font-bold'>5.00</p>
          <p className='text-lg font-bold'>76 reviews</p>
        </div>
          
          {/* grid block */}
          <div className='w-full grid grid-1 md:grid-cols-2 gap-10 '>
          {
          Reviews.map((items)=>{
            return(
              <div className='rounded-lg p-2'>
                <div className='w-full flex gap-x-3 items-center '>
                  <img src="/user.png" alt="User" className='block h-10 w-10' />
                  <p>
                    <span className='block text-md font-bold'>UserId</span>
                    <span className='text-sm text-gray-700 '>Date October</span>
                  </p>
                </div>

              <p className='my-2 flex items-center gap-x-2'>
                <img src="/rate.png" alt="rate" className='block w-7 h-7' />
                <span className='block text-sm font-bold'>5.0</span>
              </p>
              <p className="text-md text-gray-700 my-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>

            {/* send api request to report this review so it can be checked by admin  can only be seen by owner*/}
            <button className='flex items-center gap-x-2 underline'>
              <img src="/flag.png" alt="flag" className='block h-5 w-5' />
              <span className='block text-sm text-gray-700 font-bold'>Report Review</span>
            </button>

            </div>
            )
          })
        }
          </div>
        

      </div>
        </div>
      
    </main>
  )
}
