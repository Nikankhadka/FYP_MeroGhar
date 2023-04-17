import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  id: string;
  setId: (id:string) => void;
  
}

const useVerify = create<ModalStore>((set) => ({
  //default
  id:'dsfasdfasdfasdfasdf',
  // need argument to open which login or register modal
  setId: (docid:string) => set({id:docid}),
  //close
  
}));


export default useVerify;