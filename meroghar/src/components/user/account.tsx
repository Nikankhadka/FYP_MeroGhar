'use client'

import { useState } from 'react'
import Link from 'next/link'
import Card from '../card/card'
import Kyc from './kyc'
import toast, { Toaster } from 'react-hot-toast'
import useModal from '../../customHoooks/useModal'
import { ConfirmModal } from '../modals/confirmModal'
import { bg } from '../../styles/variants'
import { FetchedMe } from '../../interface/response'
import { inputStyle } from '../../styles/variants'

import { useForm, SubmitHandler } from 'react-hook-form'
import { ErrorText } from '../random'
import { PhoneComp } from './phone'
import EmailComp from './emailcomp'
interface props {
  userData: Partial<FetchedMe>,
  is_Admin:boolean
}

export default function AccountComponent({ userData,is_Admin}: props) {
  // for kyc form component
  const [openKyc, setopenKyc] = useState('close')
  const confirmModal = useModal()

  const { kycInfo, kyc, email } = userData!

  const kycinfo = kyc!.isVerified || kyc!.pending
  console.log(kycinfo)

  const [phonemail, setphonemail] = useState('close')

  return (
    <main className={`mx-auto rounded-lg ${bg}`}>
      <div className=" w-[97%] sm:w-[80%] p-3 ">
        {/* for kyc header */}

        <h2 className="text-xl font-semibold  text-gray-700">
          {' '}
          Personal Information
        </h2>

        {/* if kyc does not exist */}

        {!kycinfo &&!is_Admin&& (
          <div className="my-3 flex items-center justify-between rounded-lg bg-slate-300 p-3 ">
            <h1 className="">Provide Kyc information ?</h1>
            <button
              className="text-sm font-bold text-gray-700 underline"
              onClick={(e) => {
                e.preventDefault()
                setopenKyc('add')
              }}
            >
              {' '}
              Add Kyc
            </button>
          </div>
        )}

        {/* if there is kyc information then render this */}

        {openKyc == 'close' && (
          <div className="mt-4">
            {kycinfo &&!is_Admin&& (
              <div>
                <Info title="First Name" value={kycInfo!.firstName} />
                <hr className="my-4 border-gray-400" />
                <Info title="Last Name" value={kycInfo!.lastName} />
                <hr className="my-4 border-gray-400" />
                <Info title="Gender" value={kycInfo!.gender} />
                <hr className="my-4 border-gray-400" />
                <Info
                  title="Address"
                  value={`${kycInfo!.country},${kycInfo!.state},${
                    kycInfo!.city
                  }`}
                />
                <hr className="my-5 border-gray-400" />
              </div>
            )}

          <div>
              {phonemail!='email'&&<div className=" flex items-center justify-between">
                <p>
                  <h1 className="my-1 font-semibold">Email</h1>
                  <p className="text-sm text-gray-600">
                    {kycInfo?.email==''? `${email?.mail==''? '':`${email?.mail}  --Verify Mail`}`:kycInfo?.email}
                  </p>
                </p>

                <button
                  onClick={(e) => setphonemail('email')}
                  className="text-sm font-semibold underline"
                >
                  {kycInfo?.email == '' ? 'Add' : 'Edit'}
                </button>
              </div>}

              {
                phonemail=='email'&&<div className='p-2 '>
                 <EmailComp email={kycInfo?.email!} setphonemail={setphonemail} />
                </div>
              }

              <hr className="my-4 border-gray-400" />
            </div>
          

           {!is_Admin&&<div>
              {phonemail!='phone'&&<div className=" flex items-center justify-between">
                <p>
                  <h1 className="my-1 font-semibold">Phone Number</h1>
                  <p className="text-sm text-gray-600">
                    {kycInfo?.phoneNumber}
                  </p>
                </p>

                <button
                  onClick={(e) => setphonemail('phone')}
                  className="text-sm font-semibold underline"
                >
                  {kycInfo?.phoneNumber == '' ? 'Add' : 'Edit'}
                </button>
              </div>}

              {
                phonemail=='phone'&&<div className='p-2'>
                  <PhoneComp phoneNumber={kycInfo?.phoneNumber!} setphonemail={setphonemail} />
                </div>
              }

              <hr className="my-4 border-gray-400" />
            </div>}

            {kycinfo &&!is_Admin&&(
              <div className=" flex items-center justify-between p-3">
                <p>
                  <h1 className="my-2 font-semibold">Id</h1>
                  <img
                    src={kycInfo!.img.imgUrl}
                    alt="imghere"
                    className="my-2 block h-auto  w-[85%] rounded-lg sm:w-[60%]"
                  />
                </p>
              </div>
            )}

            {kycinfo&&!is_Admin&& (
              <div>
                <hr className="my-5 border-gray-400" />
                <div className="flex justify-end">
                  <button
                    className="text-md font-semibold text-gray-700 underline"
                    onClick={(e) => {
                      e.preventDefault()
                      setopenKyc('edit')
                    }}
                  >
                    Edit All
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* prop drilling */}
      {openKyc == 'add' && <Kyc setopenKyc={setopenKyc} userData={userData} />}
      {openKyc == 'edit' && <Kyc setopenKyc={setopenKyc} userData={userData} />}
    </main>
  )
}

interface infoprops {
  title: string
  value: string
}

function Info({ title, value }: infoprops) {
  return (
    <div className="flex items-center justify-between">
      <p>
        <h1 className="my-1 font-semibold">{title}</h1>
        <p className="text-sm text-gray-600">{value}</p>
      </p>
    </div>
  )
}

   