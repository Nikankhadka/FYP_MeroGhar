'use client'


import useBookingStore from "../../customHoooks/bookingStore"
import useModal from "../../customHoooks/useModal"
import {AiFillStar} from 'react-icons/ai'
const style1='bg-white border-2 border-gray-200 flex  flex-col items-center justify-center rounded-lg shadow-lg md:w-[540px]'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Api from "../../api/client/axios"
import { useRouter } from "next/navigation"
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import dayjs  from "dayjs"
import Modal from "./modal"
import Invoice from "../listing/bill"
import {createRef, useState} from 'react'
import { toast } from "react-hot-toast"
import KhaltiCheckout from "khalti-checkout-web";


export function BookingModal(){
    const bookingModal=useModal()
    const billref=createRef<HTMLDivElement>()
    const bookingStore=useBookingStore()
    const router=useRouter();
    const {images,property_type,name,avg_Rating,userId,price,_id}=bookingStore.propertyData;
    const {guest,startDate,endDate}=bookingStore.bookingInfo

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(start,'day') + 1;
    const  basePrice=totalDays*price!
    const taxPrice=(basePrice/100)*18;
    const totalCost=basePrice+taxPrice;

    //can set from khalti and paypal
    const [bill,setbill]=useState(false);
    const [paymentid,setpaymentid]=useState('');
    const [payerid,setpayerid]=useState('');

    const khaltiHandler=async()=>{
       
        let config = {
            // replace this key with yours
            "publicKey": "test_public_key_9df6a476434945f4a118424a7bead0e2",
            "productIdentity": `6441ff003c81cbd8e21c4fee`,
            "productName": `6441ff003c81cbd8e21c4fee`,
            "productUrl": `localhost:3000/rooms/6441ff003c81cbd8e21c4fee`,
            "eventHandler": {
                onSuccess (payload:any) {
                    console.log(payload);
                    // const body={
                    //     startDate:bookingStore.bookingInfo.startDate,
                    //     endDate:bookingStore.bookingInfo.endDate,
                    //     guest:bookingStore.bookingInfo.guest,
                    //     payerId:details.payer.payer_id,
                    //     paymentId:details.id,
                    //     initialAmount:basePrice,
                    //     serviceCharge:taxPrice,
                    //     totalAmount:totalCost,
                    //     stay:totalDays
                    //     }
                    //     setpayerid(details.payer.payer_id)
                    //     setpaymentid(details.id)

                    //     console.log("bookingBody",body)
                    //     try{
                    //     const newBooking=Api.post(`/property/v1/booking/${_id}`,body,{withCredentials:true}).then((res)=>{
                    //         toast.success(`Booking/Payment completed by ${name}`);

                    //     return  setbill(true);
                    //     }).catch((e)=>{
                    //         toast.error("Booking/Payment Failed")
                    //         return bookingStore.setError(true)
                    //     })
                        
                    //     }catch(e:any){
                        
                    //     toast.error("This booking conflicts with an existing booking/Error occurred.");
                    //     return bookingStore.setError(true)
                    //     }

                },
                // onError handler is optional
                onError (error:any) {
                    console.log(error)
                   
                },
                onClose () {
                    console.log('widget is closing');
                }
            },
            "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
        };
        
        
        const checkout = new KhaltiCheckout(config);
        //the amount passed is in paisa so make sure to *100 and amount should be less than 200 for test
        checkout.show({amount:2000})
        
    }

    const uploadBill=async()=>{
        const element = billref.current;
        const canvas = await html2canvas(element!);
        const data = canvas.toDataURL('image/png');
        
        
        // Remove data URL prefix and convert to buffer
        const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        console.log('buffer here',buffer)
    }
    
    const handleDownloadPdf = async () => {
        const element = billref.current;
        const canvas = await html2canvas(element!);
        const data = canvas.toDataURL('image/png');
        console.log('data',data);
        //now uplaod 
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        
        const billpdf= pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');
       
        bookingModal.onClose()
        setbill(false);
        bookingStore.setError(false)
        return router.refresh();
      };
    

    if(bookingModal.isOpen!='booking'){
        return null;
    }
    return(
        <>
        <Modal isOpen={bookingModal.isOpen}>
        <main className={style1}>

{         !bill && <div className="w-full overflow-scroll p-4 border-2 border-red-500">
                <div className="flex  gap-x-4 flex-wrap">
                    <img src={images![0].img_url} alt="propertyImage" className="w-[95%] mx-auto sm:m-0 h-40 sm:h-48  rounded-lg" />
                    
                    <div className="p-2 flex flex-row items-center w-full justify-around " >

                    <div >
                    <p className="text-sm text-gray-600">{property_type}</p>
                    <h1 className="text-md font-semibold">{name}</h1>
                    </div>
                  
                    <div>
                    <p  className="text-sm flex items-center gap-x-1"><AiFillStar/>{avg_Rating}</p>
                    <p className='mt-2 text-sm font-semibold'>{userId}</p>
                    </div>
                   
                    </div>
                </div>
                

                <hr  className="border-gray-300 my-3"/>

                <div>
                <h2 className="text-lg font-semibold mb-3">Your Total</h2>
                <div className="flex justify-between items-center">
                    <p className='text-md'>{totalDays} nights</p>
                    <p className="font-semiBold"> ${basePrice}</p>
                </div>

                <div className="my-3 flex justify-between items-center">
                <p className='text-md'>Taxes/Charge</p>
                <p className="font-semiBold">${taxPrice}</p>
                </div>

                </div>

                <hr  className="border-gray-300 my-3"/>
                
                <div className="flex justify-between items-center">
                    <p className='font-semibold text-md'>Total $</p>
                    <p className="font-semiBold text-md"> ${totalCost}</p>
                </div>

                <div className="mt-5">
                <button className="bg-violet-500 mb-2 w-full h-10 rounded-sm text-white font-semibold hover:bg-violet-700 transition-all" onClick={khaltiHandler}> Khalti</button>
                <PayPalScriptProvider options={{ "client-id":'AQBVm0xUYDKKY-d-Jf3xUHDSgGpDkw2N_9cvIXP_ty4BQZ_GWJidp5fWZRDgwjlSDsYq1Wv9SBJnbK-d'}}>
                <PayPalButtons style={{ layout: "horizontal",color:"blue" ,height:40,tagline:false }} createOrder={(data, actions) => {
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
                    return actions.order.capture().then(async(details:any) => {
                        const name = details.payer.name.given_name;
                        
                        console.log(details)

                        const body={
                        startDate:bookingStore.bookingInfo.startDate,
                        endDate:bookingStore.bookingInfo.endDate,
                        guest:bookingStore.bookingInfo.guest,
                        payerId:details.payer.payer_id,
                        paymentId:details.id,
                        initialAmount:basePrice,
                        serviceCharge:taxPrice,
                        totalAmount:totalCost,
                        stay:totalDays
                        }
                        setpayerid(details.payer.payer_id)
                        setpaymentid(details.id)

                        console.log("bookingBody",body)
                        try{
                        const newBooking=await Api.post(`/property/v1/booking/${_id}`,body,{withCredentials:true});
                        if(!newBooking.data.success){
                            toast.error(newBooking.data.error)
                            return bookingStore.setError(true)
                        }
                        
                        toast.success(`Booking/Payment completed by ${name}`);

                        return  setbill(true);
                        
                        }catch(e:any){
                        
                        toast.error("This booking conflicts with an existing booking/Error occurred.");
                        return bookingStore.setError(true)
                        }
                        
                       
                        
                    });
                }} />
        </PayPalScriptProvider>

      
                </div>
           </div>}
            
            {/* this div is for bill download after the payment and booking has been finalized */}
            {bill&&<div className="w-full">
            <div ref={billref} >
            <Invoice paymentId={paymentid} price={price!} nights={totalDays} tennantId="Random1" propertyId={_id!} hostId={userId!} initialPrice={basePrice} taxAndServiceChargePrice={taxPrice} totalPrice={totalCost} />
            </div>
        
            <div className="w-[95%] ml-2 p-2 flex items-center justify-between">
            <button type="button" className=" text-md font-semibold underline"  onClick={(e)=>{
                e.preventDefault();
                bookingModal.onClose();
                setbill(false);
                bookingStore.setError(false)
                return router.refresh();
            }}>
            cancel
            </button>
            <button type="button" className=" text-md font-semibold underline"  onClick={handleDownloadPdf}>
            Download Bill
            </button>
            </div>
           

            </div>}
            
        </main>

        
        </Modal>
        
        </>
    )
}
