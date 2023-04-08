'use client'

import useModal from "../../customHoooks/useModal"

import LoginSignup from "../loginSignup"

import Modal from "./modal"

export function RegisterModal(){
    const registerModal=useModal()
    if(registerModal.isOpen!='signup'){
        return null;
    }
    return(
        <>
        <Modal isOpen={registerModal.isOpen}>
        <LoginSignup login={false} modal={true}/>
        </Modal>
        
        </>
    )
}
