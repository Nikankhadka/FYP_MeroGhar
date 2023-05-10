'use client'

import useModal from "../../customHoooks/useModal"
import ConfirmComp from "./confirmComp"


import Modal from "./modal"

export function ConfirmModal(){
    const confirmModal=useModal()
    if(confirmModal.isOpen!='confirm'){
        return null;
    }
    return(
        <>
        <Modal isOpen={confirmModal.isOpen}>
          <ConfirmComp />
        </Modal>
        
        </>
    )
}

