import React,{useState} from 'react';
import {MonnifyButton} from 'react-monnify';
import useFetch from './customHooks/useFetch';
import httpService from '../services/httpServices'


import auth from '../services/authService';


function SDK({messageText}) {
  const url = `${httpService.setURL()}/gateway/card-payment`;
   const {name,email} = auth.getCurrentUser()
  const {data} =  useFetch(`${httpService.setURL()}/keys/api`);
  
  const [message,setMessage] = useState('')
  let contract = '';
  let key =''
  if(data){
     contract += data.res.contract;
     key += data.res.key
  }
  let paymentRef = '';
  setInterval(() => {
    paymentRef += Math.floor(Math.random() * 100054000 + 1)
  }, 3000);

  const [input,setInput] = useState({amount:"",phone:"",description:""})
  const handleChange=e=>{
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  let {amount,phone,description} = input;
  
  const config = {
    amount: amount,
    currency: 'NGN',
    reference: '' + paymentRef,
    customerFullName:name,
    customerEmail: email,
    customerMobileNumber: phone,
    apiKey: key,
    contractCode: contract,
    paymentDescription: description?description:`${name} payment`,
    isTestMode: true,
    metadata: {
      name: name,
    },
  };

  const axiosConfig = httpService.setJwtHeaders()
  const componentProps = {
    ...config,
    onSuccess: function(response){ 
      const{amountPaid,authorizedAmount,transactionReference,status,paymentStatus,paidOn,paymentReference,paymentDescription} = response;
      const customer ={name,email}//customer object
      const product ={type:'card',reference:'null'}//product object
      const accountDetails = { accountNumber : '0292023920' };
      const accountPayments = { accountName : customer.name }; 
      
      const depositObject ={amountPaid,settlementAmount:authorizedAmount, paymentDescription, paymentStatus, transactionReference, product, transactionStatus:status,customer,paidOn,paymentReference,accountDetails,accountPayments};

      const deposit =  httpService.post(url,depositObject,axiosConfig);
      var res= Promise.resolve(deposit);
      res.then(result=>{
         setMessage(result.data.message)
        setTimeout(()=>{
          window.location.href=('/online-deposit')
        },5000)
      })      
    },
    onClose: (response) => console.log(response),
  };
  return (
    <div className="row  justify-content-center ">
      <div className="card-body col-md-8">
        <div className="card shadow-lg ">
          <div className="card-body">
            <h4 className="text-center">Online Deposit Form</h4>
            <p className="text-center">NOTE:Fields with <span className="text-danger">*</span> are required</p>
            {message && <p>{messageText}</p>}
            <div className="form-group">
            <label htmlFor="amount">Amount<sup className="text-danger">*</sup></label>
              <input type="number" min="0" onChange={handleChange} value ={amount} className="form-control" name="amount" placeholder="Enter amount you want to deposit"/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone<sup className="text-danger">*</sup></label>
              <input type="text"  onChange={handleChange} value ={phone} className="form-control" name="phone" placeholder="Enter phone number"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Payment Description</label>
              <textarea   onChange={handleChange} value ={description} className="form-control" name="description" placeholder="Enter your payment description here"/>
            </div>
            <div className="form-group text-center ">
               {amount && phone?<MonnifyButton 
               {...componentProps} 
               text="Make Your Deposit" 
               className="btn btn-primary"  />:
               <button disabled="disabled"className="btn btn-bg">Make Your Deposit</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SDK;
