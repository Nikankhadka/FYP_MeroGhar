import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  openComponent: string;
  onOpen: (modal:string) => void;
  onClose: () => void;
}

const useAccount= create<ModalStore>((set) => ({
  //default
  openComponent:'close',
  // need argument to open which login or register modal
  onOpen: (comp:string) => set({openComponent:comp}),
  //close
  onClose: () => set({openComponent:'close'})
}));


export default useAccount;