import {useState} from 'react';
import useFetch from './useFetch';
import httpServices from '../../services/httpServices';
import authService from '../../services/authService';

const useTransfer=(url='',id=null,withdrawalCategory='')=>{
  // The ${withdrawalCategory} passed in as argument is just check if the withdrawalrequest is from the savings or investment category
  const defaultURL= httpServices.setURL()
  const status = localStorage.getItem('break-account')
  const user = authService.getCurrentUser();
  const userEmail = user.email;
  const [value, setValue] = useState({
    destinationAccountNumber:'', 
    amount:0, 
    destinationBankCode:"",
    narration:""
  });
  const {data} = useFetch(`${defaultURL}/banks/`);//get all available banks by monnify
  const [transferError,setTransferError] = useState('');
  const [isLoading,setIsloading] = useState(false);
  const config = httpServices.setJwtHeaders();
  const [message,setMessage] = useState('');
  const [transferStatus,setTransferStatus] = useState(false)
  
  const handleChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    })
  }
  const response = useFetch(`${url}`);//get the active investment records by an individual
  const rescords = response.data;
  const loading = response.ispending;
  const ex = response.error;
  let {destinationAccountNumber,destinationBankCode,narration,amount} = value;
  let actualAmount=0;
  if(!loading && !ex && rescords !==null){
    let {investmentAmount,actualInterest} = rescords.message;
    investmentAmount = parseInt(investmentAmount);
    actualInterest=  parseInt(actualInterest)
    if(status){
      const penalty = investmentAmount * 0.04;
      amount+= investmentAmount - penalty;
    }else{
      amount += investmentAmount + actualInterest;
    }
   actualAmount +=investmentAmount + actualInterest;
   
  }
  if(url===''){
    amount = localStorage.getItem('amount')
  }
  
  const transferData= {
    amount,destinationAccountNumber, destinationBankCode,narration,userEmail,investmentID:id,withdrawalCategory
  }

  const handleSubmit =  async e=>{
    e.preventDefault();
    try {
      setIsloading(true)
      setTransferError('')
      setMessage('')
      const response = await httpServices.post(`${defaultURL}/disburse/transfer`,transferData,config);
      setIsloading(false);
      if(response.data.data !== undefined){
        setMessage(response.data.data.responseBody.status);
        setTransferStatus(true);
      }else if(response.data.error !==undefined){
        setTransferError(response.data.error);
      }
      
    } catch(error) {
      if(error.response !==undefined)setTransferError(error.response.data.error);
      else setTransferError('Please check your network connection and try again');
      setIsloading(false)
    }
  }
  return {
    status, handleChange, handleSubmit,amount,
    actualAmount,destinationAccountNumber,
    destinationBankCode,postBankData:data, transferStatus,
    transferError,  userEmail,
    isLoading,message,narration
  }
}

export default useTransfer