import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  listPorperty:string,
  propIndex:number,
  onList:(state:string) => void;
  setIndex:(index:number)=> void;
}

const useRandom=create<ModalStore>((set) => ({
  //default
  listPorperty:'close',
  propIndex:0,
  // need argument to open which login or register modal
  onList: (state:string) => set({listPorperty:state}),
  //close
  setIndex:(index:number) => set({propIndex:index}),
}));


export default useRandom