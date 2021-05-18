import React from 'react';
import useDocumentTitle from './customHooks/useDocumentTitle';
import WithdrawalsObject from './transactions/withdrawals_object';
import useTransfer from './customHooks/useTransfer';
import auth from '../services/authService';
import { useParams } from 'react-router-dom';
import http from '../services/httpServices';


const InitiateTransfer=(props)=>{
  const url = http.setURL()
  const {id} = useParams()
  useDocumentTitle("Kolo-vest: Transfer|Withdrawals")
  const {
    status, handleChange, handleSubmit,amount,
    actualAmount,destinationAccountNumber,
    destinationBankCode,postBankData,transferError, 
    userEmail,isLoading,message,narration,transferStatus
  }= useTransfer(`${url}/savings-investments/single-investment/${id}/${auth.getCurrentUser().email}`,id);
  
  if(transferStatus===true){ //check if the withdrawal request was successfull before redirecting the user
    setTimeout(()=>{
      props.history.replace('/deposit/histories')
    },5000)
  }

  return(
  <>
  <div className='row justify-content-center py-3'>
    <div className='col-md-6 col-sm-8'>
      <WithdrawalsObject
      status={status} handleChange={handleChange} handleSubmit={handleSubmit}amount={amount}
      actualAmount={actualAmount}
      destinationAccountNumber={destinationAccountNumber} destinationBankCode={destinationBankCode}
      data={postBankData} transferError ={transferError} id={id} userEmail={userEmail}
      isLoading={isLoading} message={message} narration={narration}
      />
    </div>
  </div>
  </>
  )
}

export default InitiateTransfer