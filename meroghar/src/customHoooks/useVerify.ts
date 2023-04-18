
import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  id:string,
  setId:(id:string)=>void

  action:{
    onReject:(message:string)=>void
  }

  onContent:(action:{onReject:(messsage:string)=>void})=>void,

  
}

const useVerify = create<ModalStore>((set) => ({
  id:" header:string, header:string,",
  action:{
     onReject:(message:string)=>console.log('Action Called ',message)
},
  setId:(id:string)=>set({id:id}),
  onContent:(newContent)=> set({action:newContent}), 

}));


export default useVerify;