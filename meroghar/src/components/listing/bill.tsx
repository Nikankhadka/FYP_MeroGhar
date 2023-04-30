import React from 'react';

interface InvoiceProps {
    tennantId: string;
    //can be anyone jsut saved for reference
    nights:number,
    rate:number,
    hostId: string;
    propertyName: string;
    initialPrice: number;
    taxAndServiceChargePrice: number;
    totalPrice: number;
    paymentId:string
}
const Invoice =(props:InvoiceProps) => {
  const { 
    tennantId, 
    propertyName,
    hostId,
    initialPrice,
    taxAndServiceChargePrice,
    totalPrice,
    paymentId,
    nights,
    rate,
  } = props;

  return (
    
    

<div className="bg-white  w-full max-w-4xl mx-auto rounded-lg ">
  <div className="bg-gray-100 p-4 border-b border-gray-200">
    <div className="w-full flex items-center justify-between">
      <div className="w-full">
        <div>
          <img src="/airbnb.png" alt=""  className='h-14 w-14'/>
        </div>

        <h6 className="font-semibold mt-2 text-gray-600 mb-1">Invoice #:{paymentId}</h6>
      </div>
      
    </div>
  </div>
  <div className="p-4">
    <div className="w-full">

      <div className='my-2'>
        <div className="font-semibold ">Billed to:</div>
        <div>{tennantId}</div>
        
      </div>

      <div className='my-2'>
        <div className="font-semibold ">Billed From:</div>
        <div>{hostId}</div>
      </div>

      <div className='my-2'>
        <div className="font-semibold ">Date Of Issue:</div>
        <div>{new Date().toString()}</div>
      </div>

    </div>

    <table className=" mt-8 w-full">
      <thead className='w-full'>
        <tr className='w-full border-b p-2  border-gray-200 flex items-center justify-around'>
          <th className="">Nights</th>
          <th className="">Property Id</th>
          <th className="">Rate</th>
          <th className="">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr className=' w-full  p-2  flex items-center justify-around'>
          <td className="text-center">{nights}</td>
          <td>{propertyName}</td>
          <td className="">${rate}/Night</td>
          <td className="">${initialPrice}</td>
        </tr>
      </tbody>
    </table>

    <hr className='border my-5 border-gray-200' />
    <div className='w-full my-4 '>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-bold text-md '>SubTotal:</h2>
      <p>${initialPrice}</p>
    </div>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-semibold text-md '>Tax/Service Charge:</h2>
      <p>${taxAndServiceChargePrice}</p>
    </div>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-semibold text-md '>Total Amount:</h2>
      <p>${totalPrice}</p>
    </div>

    </div>
        <div className="mt-4">
          <span className="font-semibold">Success! Amount Paid</span>
          
        </div>
      </div>
    </div>
)

  
  
};

export default Invoice;