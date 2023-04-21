'use client'



import useBookingStore from "../../customHoooks/bookingStore"
import useModal from "../../customHoooks/useModal"
import {AiFillStar} from 'react-icons/ai'
const style1='bg-white border-2 border-gray-200 flex  flex-col items-center justify-center rounded-lg shadow-lg md:w-[540px]'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { checkout } from "../../configs/khalti"

import Modal from "./modal"

export function BookingModal(){
    const bookingModal=useModal()
    const bookingStore=useBookingStore()

    const {images,property_type,name,avg_Rating,userId,price}=bookingStore.propertyData;
    const {guest,startDate,endDate}=bookingStore.bookingInfo
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const Days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const totalDays=Days==0? 1:Days
    const  basePrice=totalDays*price!
    const taxPrice=(basePrice/100)*18;
    const totalCost=basePrice+taxPrice;

    const khaltiHandler=async()=>{
        //the amount passed is in paisa so make sure to *100
        checkout.show({amount:(totalCost*120)*100})
    }

    if(bookingModal.isOpen!='booking'){
        return null;
    }
    return(
        <>
        <Modal isOpen={bookingModal.isOpen}>
        <main className={style1}>
           <div className=" w-full p-4 border-2 border-red-500">
                <div className="flex  gap-x-4 flex-wrap">
                    <img src={images![0].img_url} alt="propertyImage" className="w-[95%] mx-auto sm:m-0 h-48 sm:h-40 sm:w-44 rounded-lg" />
                    
                    <div className="p-2 " >

                    <div className="mt-3">
                    <p className="text-sm text-gray-600">{property_type}</p>
                    <h1 className="text-md font-semibold">{name}</h1>
                    </div>
                  
                    <div className=" mt-6">
                    <p  className="text-sm flex items-center gap-x-1"><AiFillStar/>{avg_Rating}</p>
                    <p className='mt-2 text-sm font-semibold'>{userId}</p>
                    </div>
                   
                    </div>
                </div>
                <hr  className="border-gray-300 my-5"/>

                <p className="text-md font-semibold text-center text-mainColor ">Property Verified and Safe</p>

                <hr  className="border-gray-300 my-5"/>

                <div>
                <h2 className="text-lg font-semibold my-3">Your Total</h2>
                <div className="flex justify-between items-center">
                    <p className='text-md'>{totalDays} nights</p>
                    <p className="font-semiBold"> ${basePrice}</p>
                </div>

                <div className="my-3 flex justify-between items-center">
                <p className='text-md'>Taxes/Charge</p>
                <p className="font-semiBold">${taxPrice}</p>
                </div>

                </div>

                <hr  className="border-gray-300 my-5"/>
                
                <div className="flex justify-between items-center">
                    <p className='font-semibold text-md'>Total $</p>
                    <p className="font-semiBold text-md"> ${totalCost}</p>
                </div>

                <div className="mt-5">
                <button className="bg-violet-500 mb-2 w-full h-10 rounded-sm text-white font-semibold hover:bg-violet-700 transition-all" onClick={khaltiHandler}> Khalti</button>
                <PayPalScriptProvider options={{ "client-id":'AQBVm0xUYDKKY-d-Jf3xUHDSgGpDkw2N_9cvIXP_ty4BQZ_GWJidp5fWZRDgwjlSDsYq1Wv9SBJnbK-d'}}>
                <PayPalButtons style={{ layout: "horizontal",color:"blue" ,height:40 }} createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value:totalCost.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions:any) => {
                    return actions.order.capture().then((details:any) => {
                        const name = details.payer.name.given_name;
                        console.log(details)
                        alert(`Transaction completed by ${name}`);
                    });
                }} />
        </PayPalScriptProvider>
                </div>
           </div>
        </main>
        </Modal>
        
        </>
    )
}
