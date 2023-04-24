'use client'
import Link from 'next/link'
import { Arrow } from '../buttons'
import Wish from '../Svg/wishSvg'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import {
  BsFillClipboardCheckFill,
  BsHouseCheckFill,
  BsFillHouseDashFill,
} from 'react-icons/bs'
import { Property } from '../../interface/response'
// hover:-translate-y-1 hover:scale-105
import { useState } from 'react'
import useModal from '../../customHoooks/useModal'
import useConfirm from '../../customHoooks/useConfirm'
import useVerify from '../../customHoooks/useVerify'
import { toast } from 'react-hot-toast'
import { verifyProperty } from '../../api/client/admin'
import { useRouter } from 'next/navigation'
import useRandom from '../../customHoooks/randomStore'
import Api from '../../api/client/axios'

//admin card
interface props {
  user?: string
  data?: Partial<Property>
  index: number
}
export default function Card({ user, data, index }: props) {
  const [img,setimg] = useState(0);
  
  
  const { images, _id, avg_Rating, location, price } = data!

  const modal = useModal()
  const confirm = useConfirm()
  const verify = useVerify()
  const list = useRandom()
  const router = useRouter()

  return (
    <main className="mx-auto my-auto h-fit w-[98%] rounded-lg border-2 border-gray-300 bg-white duration-300   hover:shadow-xl">
      <div className="">
        <Link href={`/Home/rooms/${_id}`} target="_blank">
          <img
            src={images![img].img_url}
            alt="property"
            className=" w-full    rounded-lg"
          />
        </Link>
      </div>
      <div className="my-2 flex  justify-center gap-3">
        <button
          onClick={(e) => {
            if (img == 0) {
              return console.log('o here')
            }
            return setimg(img - 1)
          }}
          className=" rounded-full bg-gray-100  bg-opacity-70 p-3 transition-all  hover:bg-white hover:bg-opacity-100 hover:drop-shadow-lg"
        >
          <img src="/left.png" alt="arrow" height={9} width={9} />
        </button>

        <button
          onClick={(e) => {
            if (img == images?.length! - 1) {
              return console.log('o here')
            }
            return setimg(img + 1)
          }}
          className=" rounded-full bg-gray-100  bg-opacity-70 p-3 transition-all  hover:bg-white hover:bg-opacity-100 hover:drop-shadow-lg"
        >
          <img src="/arrow.png" alt="arrow" height={9} width={9} />
        </button>
      </div>

      {!user && (
        <div className=" flex items-center justify-between px-2">
          <Wish active={false} />
          <p className="flex items-center">
            <img src="/rate.png" alt="rate" width={20} height={20} />
            <span className="text-md text-gray-600">{data?.avg_Rating}</span>
          </p>
        </div>
      )}

      <div className="my-2 mx-auto w-[95%]">
        <p className="text-sm font-semibold">
          {location?.country},{location?.state},{location?.city}
        </p>
        <p className="gray-600 text-sm">
          <span className="text-sm font-semibold">{price}$</span> Night
        </p>
      </div>

      {user == 'admin' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            onClick={(e) => {
              e.preventDefault()
              console.log('verify')

              confirm.onContent({
                header: 'Are You Sure To Verify Property?',
                actionBtn: 'Verify',
                onAction: async () => {
                  const res = await verifyProperty(_id!, { isVerified: true })
                  if (res) {
                    toast.success(`Property ${_id!} verified successfully`)
                    modal.onClose()
                    return router.refresh()
                  }

                  toast.error('Failed to verify Property')
                  return modal.onClose()
                },
              })

              modal.onOpen('confirm')
            }}
          >
            <BsHouseCheckFill className="mr-2 h-4 w-4" />
            Verify
          </button>

          <button
            type="button"
            className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            onClick={(e) => {
              e.preventDefault()
              console.log('reject')
              //set id

              verify.onContent({
                onReject: async (message: string) => {
                  const res = await verifyProperty(_id!, {
                    isVerified: false,
                    message,
                  })
                  if (res) {
                    toast.success('Property Post Rejected')
                    modal.onClose()
                    return router.refresh()
                  }
                  toast.error('Property rejection Failed!')
                  return modal.onClose()
                },
              })
              //modal open for rejection
              modal.onOpen('reject')
            }}
          >
            <BsFillHouseDashFill className="mr-2 h-4 w-4" />
            Reject
          </button>
        </div>
      )}

      {user == 'user' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            onClick={(e) => {
              e.preventDefault()
              list.setIndex(index)
              list.onList('edit')
            }}
          >
            <FiEdit className="mr-2 h-4 w-4" />
            Update
          </button>

          <button
            type="button"
            className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            onClick={(e) => {
              confirm.onContent({
                header: 'Are You Sure To Delete Property?',
                actionBtn: 'Delete',
                onAction: () => {
                  Api.delete(`/property/v1/deleteProperty/${_id}`, {
                    withCredentials: true,
                  })
                    .then((res) => {
                      toast.success(`Property ${_id!} deleted successfully`)
                      modal.onClose()
                      return router.refresh()
                    })
                    .catch((e) => {
                      toast.error(
                        'Failed to delete Property/Property Booked currently'
                      )
                      return modal.onClose()
                    })
                },
              })

              modal.onOpen('confirm')
            }}
          >
            <RiDeleteBin6Fill className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </main>
  )
}
