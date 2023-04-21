import { create } from 'zustand';
import { Property } from '../interface/response';

//this same modal store can be used for any other modal through out the application
interface Booking{
    
        guest:number,
        startDate:Date,
        endDate:Date
      
}
interface ModalStore {
  propertyData:Partial<Property>
  setPropertyData:(Data:Partial<Property>)=> void;
  bookingInfo:Booking
  setbookingInfo:(Data:Booking)=> void;
  
}

const useBookingStore=create<ModalStore>((set) => ({
  //default
    propertyData:{},
    bookingInfo:{
        guest:0,
        startDate:new Date(),
        endDate:new Date()
        
    },
    setPropertyData:(data)=>set({propertyData:data}),
    setbookingInfo:(data)=>set({bookingInfo:data})
}));


export default useBookingStore