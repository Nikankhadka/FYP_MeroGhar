'use client'

import {useState} from 'react'
import Link from 'next/link'
import Card from '../card/card'
import Kyc from './kyc'
import toast, { Toaster } from 'react-hot-toast';
import useModal from '../../customHoooks/useModal'
import { ConfirmModal } from '../modals/confirmModal'
import { bg } from '../../styles/variants'
import { FetchedMe } from '../../interface/response'



interface props{
  userData:FetchedMe
}


export default function AccountComponent({userData}:props) {
  
  // for kyc form component
  const [openKyc,setopenKyc]=useState('close');
  const confirmModal=useModal()


  const {kycInfo,kyc,email,}=userData

  const kycinfo=kyc.isVerified||kyc.pending
  console.log(kycinfo);





  return (
    <main className={`mx-auto rounded-lg ${bg}  w-[95%] sm:w-[90%] lg:w-[85%] `} >   

    <div className=' p-3 w-[80%] '>

    
        {/* for kyc header */}
        
        <h2 className='text-xl font-semibold  text-gray-700'> Personal Information</h2>


      {/* if kyc does not exist */}

      {!kycinfo&&<div className='bg-slate-300 p-3 rounded-lg my-3 flex items-center justify-between '>
        <h1 className=''>Provide Kyc information ?</h1>
        <button className='text-sm font-bold text-gray-700 underline' onClick={(e)=>{
          e.preventDefault();
          setopenKyc('add')
        }}> Add Kyc</button> 
      </div>}
        
      {/* if there is kyc information then render this */}

 {  openKyc=='close'  &&   <div className='mt-4'>
        
        {kycinfo&&<div>
        <Info title='First Name' value={kycInfo.firstName}/>
        <hr className="my-4 border-gray-400" />
        <Info title='Last Name' value={kycInfo.lastName}/>
        <hr className="my-4 border-gray-400" />
        <Info title='Gender' value={kycInfo.gender}/>
        <hr className="my-4 border-gray-400" />
        <Info title='Address' value={`${kycInfo.address.country},${kycInfo.address.state},${kycInfo.address.city}`} />
        <hr className="my-5 border-gray-400" />
        </div>}
        
        {email.mail!=''&&<div>
        <Info title='Email' value={email.mail}/>
        <hr className="my-4 border-gray-400" />
        </div>}

        {kycInfo.phoneNumber!=''&&<div>
        <Info title='Phone Number' value={kycInfo.phoneNumber}/>
        <hr className="my-4 border-gray-400" />
        </div>}

        {kycinfo&&<div className=' p-3 flex items-center justify-between'>
        <p>
          <h1 className='font-semibold my-2'>Id</h1>
            <img src={kycInfo.img.imgUrl} alt="imghere" className='block h-auto w-[85%]  sm:w-[60%] rounded-lg my-2'/>
        </p>
        
        <button className='text-sm text-gray-700 font-semibold underline'>Edit</button>
        </div>}
   

        {kycinfo&& <div>
      <hr className="my-5 border-gray-400" />
      <div className='flex justify-end'>
      <button className='underline text-md font-semibold text-gray-700' onClick={(e)=>{
        e.preventDefault();
        setopenKyc('edit');
        
      }}>Edit All</button>
      </div>
      </div>}
      


     

      </div>}


      </div>
  
    {/* prop drilling */}
     {openKyc=='add'&&<Kyc setopenKyc={setopenKyc} userData={userData}  />}
     {openKyc=='edit'&&<Kyc setopenKyc={setopenKyc}  userData={userData}/>}

     


    </main>
  )
}


interface infoprops{
  title:string,
  value:string,
  
  }
function Info({title,value}:infoprops){
    return(
      <div className=' p-3 flex items-center justify-between'>
      <p>
        <h1 className='font-semibold my-1'>{title}</h1>
          <p className='text-sm text-gray-600'>{value}</p>
      </p>
      <button className='text-sm text-gray-700 font-semibold underline'>Edit</button>
      </div>
    )}