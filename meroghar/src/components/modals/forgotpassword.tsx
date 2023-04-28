'use client'

import useModal from "../../customHoooks/useModal"
import PasswordReset from "../fogotpassword"
import ConfirmComp from "./confirmComp"


import Modal from "./modal"

export function ResetPassword(){
    const modal=useModal()
    if(modal.isOpen!='forgot'){
        return null;
    }
    return(
        <>
        <Modal isOpen={modal.isOpen}>
          <PasswordReset />
        </Modal>
        
        </>
    )
}

export default ResetPassword
