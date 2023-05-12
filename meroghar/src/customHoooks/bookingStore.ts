import { create } from 'zustand';
import { Property } from '../interface/response';

//this same modal store can be used for any other modal through out the application
interface Booking{
    
        guest:number,
        startDate:Date,
        endDate:Date
      
}
interface ModalStore {
  error:boolean,
  setError:(state:boolean)=>void,
  propertyData:Partial<Property>
  setPropertyData:(Data:Partial<Property>)=> void;
  bookingInfo:Booking
  setbookingInfo:(Data:Booking)=> void;
  billData:{
    payerId:string,
    paymentId:string
  }
  setBillData:(Data:{payerId:string,paymentId:string})=> void;
  
}

const useBookingStore=create<ModalStore>((set) => ({
  //default
    propertyData:{},
    error:false,
    bookingInfo:{
        guest:0,
        startDate:new Date(),
        endDate:new Date()
        
    },
    billData:{
      payerId:'',
      paymentId:""
    },
    setBillData:(data)=>{set({billData:data})},
    setError:(state:boolean)=>set({error:state}),
    setPropertyData:(data)=>set({propertyData:data}),
    setbookingInfo:(data)=>set({bookingInfo:data})
}));


export default useBookingStore