'use client'



import useModal from "../../customHoooks/useModal"
import LoginSignup from "../loginSignup"

import Modal from "./modal"

export function LoginModal(){
    const loginModal=useModal()

    if(loginModal.isOpen!='login'){
        return null;
    }
    return(
        <>
        <Modal isOpen={loginModal.isOpen}>
        <LoginSignup login={true} modal={true}/>
        </Modal>
        
        </>
    )
}
