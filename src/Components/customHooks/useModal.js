import  { useState } from 'react';

const useModal = ()=>{
  // const [closeModal, setCloseModal] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const handleClose= ()=>{
    setShowModal(false)
  }

  const handleShow=()=>{
    setShowModal(true)
  }
  return {handleClose, handleShow,showModal}
}
export default useModal