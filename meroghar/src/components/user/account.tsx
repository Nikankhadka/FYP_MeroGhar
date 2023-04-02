'use client'

import {useState} from 'react'
import Link from 'next/link'
import Card from '../card'
import Kyc from './kyc'

export default function AccountComponent() {
  

  // check kyc valid and pending status then only render 
  const [openKyc,setopenKyc]=useState('close');

  
  const kycinfo=false

  return (
    <main className="mx-auto  md:ml-10 p-3  w-[95%] sm:w-[90%] lg:w-[80%]  ">   

    <div className=' p-2 w-[95%] md:w-[80%]'>

        {/* for kyc header */}
        
        <h2 className='text-xl font-semibold  text-gray-700'> Personal information</h2>

      {/* if kyc does not exist */}

      {!kycinfo&&<div className='bg-gray-200 p-2 my-3 flex items-center justify-between '>
        <h1 className=''>Provide Kyc information ?</h1>
        <button className='text-sm font-bold text-gray-700 underline' onClick={(e)=>{
          e.preventDefault();
          setopenKyc('add')
        }}> Add Kyc</button> 
      </div>}
        
      {/* if there is kyc information then render this */}

 {   kycinfo&&openKyc=='close'  &&   <div className='mt-4'>
        

        <Info title='First Name' value='Nikan'/>
        <hr className="my-4 border-gray-400" />
        <Info title='Last Name' value='Khadka'/>
        <hr className="my-4 border-gray-400" />
        <Info title='Gender' value='Male'/>
        <hr className="my-4 border-gray-400" />
        <Info title='Email' value='nikhil.khadka.925@gmail.com'/>
        <hr className="my-4 border-gray-400" />
        <Info title='Phone Number' value='986541254'/>
        <hr className="my-4 border-gray-400" />
        <Info title='Email' value='nikhil.khadka.925@gmail.com'/>
        <hr className="my-5 border-gray-400" />
        <Info title='Address' value='Nepal,Kathmandu'/>
        <hr className="my-5 border-gray-400" />
        <div className=' p-3 flex items-center justify-between'>
        <p>
          <h1>Id</h1>
            <img src="/prop1.jpg" alt="imghere" className='block h-auto w-[85%]  sm:w-[60%] rounded-lg my-2'/>
            <img src="/prop1.jpg" alt="imghere" className='block h-auto w-[85%]  sm:w-[60%] rounded-lg my-2'/>
        </p>
        
        <button className='text-sm text-gray-700 font-semibold underline'>Edit</button>
        </div>
   

      <hr className="my-5 border-gray-400" />
      <div className='flex justify-end'>
      <button className='underline text-md font-bold text-gray-700' onClick={(e)=>{
        e.preventDefault();
        setopenKyc('edit');
        
      }}>Edit All</button>
      </div>
     

      </div>}


      </div>
  
     {openKyc=='add'&&<Kyc setopenKyc={setopenKyc}  />}
     {openKyc=='edit'&&<Kyc setopenKyc={setopenKyc} />}

     


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
      <h1>{title}</h1>
        <p className='text-sm text-gray-600'>{value}</p>
    </p>
    <button className='text-sm text-gray-700 font-semibold underline'>Edit</button>
    </div>
  )
}