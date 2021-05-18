import React from 'react';
import Modal from './Modal';
import useModal from './customHooks/useModal';
import SDK from './sdk';
import auth from '../services/authService';

const DepositOnline=()=>{
  const {closeModal,showModal,handleClose,handleShow} = useModal();
  return (
    <>
    <Modal 
      title={<span className="text-center">Online deposit </span>}
      handleClose =  {<button onClick={handleClose}
      className="btn btn-danger btn-sm "
      >Close</button>}
      content = {<SDK messageText="Payment recieved by us"/>}
      closeBTN={<button clasName='btn btn-primary'>Close Modal</button>}
      closeModal ={closeModal}
      showModal={showModal}
      />
     <div className="row justify-content-center mt-2">
       <div className="col-md-8 p-5">
         <div className="card  shadow">
           <div className="card-body p-5 mt-5">
             <p>Hello <b>{auth.getCurrentUser().name}!</b> We are so pleased to be at your service, Please use the deposit button to make your deposit online if you have your credit information or a ussd service available </p>
             <button className="btn btn-bg btn-sm"  onClick={handleShow}>Pay Online</button>
           </div>
         </div>
       </div>
     </div>
    </>
  )
}

export default DepositOnline


