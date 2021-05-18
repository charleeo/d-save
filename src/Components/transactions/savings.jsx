import React,{useState} from 'react';
import httpService from '../../services/httpServices'
import auth from './../../services/authService';
import { formatNumber, formatDate} from './../validate/validate';
import useData from './../customHooks/useData';
import WithdrawalsObject from './withdrawals_object';
import useTransfer from './../customHooks/useTransfer';

export const Savings=(props)=>{
  const axiosConfig= httpService.setJwtHeaders();
  const user = auth.getCurrentUser();
  let url = httpService.setURL();
  const investmentURL = `${url}/gateway/card-payment`;
  const  {email,name}= user
  const  postUrl=`${url}/savings-investments/individual-savings/${email}`
  const {data, error,isPending,emptyData} = useData(postUrl);
  const [option,setOption] = useState();
  const [show, setShow] = useState(false)
  const [ids, setIDs] = useState([]);
  const [sum,setSum] = useState([])
  const [transactionReference,setTransactionReference] = useState([])
  const [reInvestmentMessage,setReInvestmentMessage] = useState(null);
  const [reinvsterror,setReinvestError ] = useState()
  const [isloading,setIsloadin]=useState(false)
  const [showText,setShowText] = useState(false)

    
  const handleWithdrawals = e => {
    e.preventDefault();
    if(!ids.includes(e.target.id)){
      setIDs([...ids, e.target.id]);
      setSum([...sum,e.target.value])
    }
  };
  
  let splitedId = ids.toString();
  //  splitedId= JSON.parse(splitedId)


function handleOptions(event){
    setOption(event.target.value);
    let val = event.target.value
    if(val==='withdraw'){
      setShow(true)
      setTransactionReference([''])
    }else if(val==='re-invest'){
      setShow(false)
      setTransactionReference(data[0].transactionReference)
    }
}
const {
  handleChange, handleSubmit,
  destinationAccountNumber,
  destinationBankCode,postBankData,transferError,  
  userEmail,isLoading,message,narration,transferStatus,withdrawalCategory
}= useTransfer('',splitedId,'savings-withdrawals');


  /** Loop through the investment amount array and pass down the value to a new variable */
  let totalAmount =0
  if(sum.length>0){
   for(let i=0; i < sum.length; i++){
     totalAmount +=parseInt(sum[i])
   }
   localStorage.setItem('amount', parseInt(totalAmount))
  }
  
  //destructure the details to be sent to server for record keeping when the reinvestment is done
  

  const handleReInvestment= async(e)=>{
    e.preventDefault()
      const customer ={name,email}//customer object
      const product ={type:'card',reference:'null'}//product object
      const accountDetails = { accountNumber : '0292023920' };
      const accountPayments = { accountName : customer.name }; 
      const depositObject ={amountPaid:totalAmount,settlementAmount:totalAmount, paymentDescription:name+" payement ", transactionReference, product, transactionStatus:"SUCCESS",customer,paidOn:new Date(),paymentReference:null,accountDetails,accountPayments,type:"re-investment", investmentID:splitedId};
      try {
        setIsloadin(true)
        setReInvestmentMessage(null)
        const response = await httpService.post(investmentURL,depositObject,axiosConfig);
        setReInvestmentMessage(response.data.message)
        setIsloadin(false)
        setTimeout(()=>{
          props.history.replace('/deposit/histories')
        },4000)
      } catch (error) {
         setReinvestError(error.response.data.error)
         setIsloadin(false)
      }
  }

  const handleText=()=>{
   if(showText === true){
     
     setShowText(false)
   }else{
     setShowText(true)
   }
  }

  return (
    <>
    {isPending?<div  style={{background:'darkgray', height:'70vh'}}><span className="loader" style={{position:'relative', top:'50%',left:"50%", display:'block'}}></span></div>:
    <div className="row justify-content-center pt-3">
      <div className='col-md-6 col-sm-12'>
        <div className="card py-2 shadow border-0">
          <div className="card-header">
            <h3 className='text-center'>Savings</h3>
          </div>
          <div className="card-body shadow-lg">
            <table className="table  table-bordered table-striped table-responsive table-condensed">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Amount(&#8358;)</th>
                  <th>Payment Date</th>
                  <th>
                    <span className='border-bottom d-block'>Action</span>
                    {data &&<small className='d-block' style={{cursor:"pointer", textAlign:'center'}} onClick={handleText}> 
                    (?) {showText? <small>Click on the Add up button to either withdraw or re-invest this funds </small>:""}
                    </small>}
                  </th>
                </tr>
              </thead>
              <tbody>
              {(error||emptyData) &&<tr ><td colSpan='4' className='text-center text-danger'>
                {error} {emptyData}
              </td></tr>}
              {data &&data.map((result,index)=>(
                <tr key={result.id }>
                  <td>{index +1}</td>
                  <td>{formatNumber(result.investmentAmount)}</td>
                  <td>{formatDate(result.createdAt)}</td>
                  <td className='text-center'>
                    <button className='btn btn-bg btn-sm' title="when you click on any of the button,you can decide what to do with the fund by filling the form above"
                    onClick={handleWithdrawals} id={result.id} value={result.investmentAmount}
                    >Add up</button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            {/* Data manipulation */}

            {totalAmount >0 && <div className="row mb-3 border-bottom">
            <small style={{ display:'block', textAlign:"center",color:'red',borderTop:"1px solid #00000",padding:'2px'}} >Amount to  re-invest  must add up to &#8358;5100 or more before such action can be performed  while witdrawals action requires that minimum of &#8358;500 is sent for  withdrawals
            </small>
            <small className='text-info p-2 border-bottom '>
            You can decide to either re-invest these funds or withdraw them. Just use the dropdown below to make your choice
            </small>
              <div className="col-md-4 col-sm-12 p-3">
                  <small className='btn btn-sm btn-bg'>Sum: &#8358;{totalAmount}</small>      
              </div>
              <div className="col-md-8 col-sm-12 p-3">
                <div className="form-group">
                  <select name='option' onChange={handleOptions} className='form-control '>
                    <option value="">select what to do </option>
                    <option value="withdraw">Withdraw funds</option>
                    <option value="re-invest">Re-invest funds</option>
                  </select>
                </div>
                
                <form onSubmit={handleReInvestment}>
                  {reInvestmentMessage && <small className='text-success'>{reInvestmentMessage} you will be redirected  </small> }
                  {reinvsterror && <small className='text-danger'>{reinvsterror}</small>}
                  {(!show && option ==='re-invest') &&<div className="form-group">
                    <button className='btn btn-sm btn-bg'
                     disabled={totalAmount<=5000? true:false}
                    >
                      Proceed to invset {isloading &&<span className="loader ml-3"></span>}
                    </button>
                  </div>}
                </form>
              </div>
            </div>}
             
            {/* It ends here */}
          </div>
        </div>
      </div>
      {
      show &&<div className="col-md-5 ">
      
        {/* This is the withdrawals html in case the operation the user wants to perform is to withdraw */}
      <WithdrawalsObject
       data={postBankData}
       amount={totalAmount}
       handleChange={handleChange}
       handleSubmit={handleSubmit}
       message={message}
       transferError={transferError}
       destinationAccountNumber={destinationAccountNumber}
       destinationBankCode={destinationBankCode}
       narration={narration}
       userEmail={userEmail}
       isLoading={isLoading}
       id={splitedId}
       transferStatus={transferStatus}
       withdrawalCategory={withdrawalCategory}
      />
      </div>
      }
    </div>}
    </>
  )
}