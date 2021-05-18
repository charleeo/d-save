import React from 'react'
import validate from  '../validate/validate'
import Input from './../Forms/Input';

const WithdrawalsObject=({
  status, handleChange, handleSubmit,amount,actualAmount,destinationAccountNumber,destinationBankCode,data,transferError, id, userEmail,isLoading,message,narration,
  withdrawalCategory
})=>{
  return (
      <div className='card'>
        <div className='card-body'>
        {status&&<p className='text-center btn-bg py-2 border-bottom'>Amount When Due &#8358;{actualAmount}</p>}
          <small>Note: <sup>*</sup> are required </small>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="amount">Amount &#8358;{amount} </label>
            <input type='number' name='amount' className='form-control'
            placeholder='enter the amout to withdraw'
            readOnly
            value={amount}
            onChange={handleChange}
            />
            </div>

            <div className='form-group'>
                <label htmlFor='destinationBankCode'>Bank<sup>*</sup></label>
                <select value={destinationBankCode}  name="destinationBankCode"  onChange={handleChange}
                className="form-control">
                  <option value="">please select bank</option>
                  {data && data.message.map((details,index)=>(
                    <option key={index+1} value={details.code}>{details.name}</option>
                  ))}
                </select>
              </div>
              <Input type='number' name='destinationAccountNumber' label='Destination AccountNumber (10 digits)*'
            placeholder='enter the destination Account Number'
            handleChange={handleChange} value={destinationAccountNumber}
            />
            <Input type='text' name='narration' label='Payment description (min:10 chars)*'
            placeholder='enter payment description (min: 10 characters)'
            handleChange={handleChange} value={narration}
            />
            {transferError&&<div className="alert alert-danger">{transferError}</div>}
            {message &&<div className="text-center alert alert-success">{message}</div>}
            {/* The submit button end here */}

            <button 
             disabled=
             {validate(
               destinationAccountNumber,destinationAccountNumber,10,
               destinationAccountNumber,10
               )===true
               || validate(destinationBankCode)===true || validate(narration,narration,10)===true ||amount < 500|| isLoading ? true:false} 
             className='btn btn-sm btn-bg'>
              Withdraw funds {isLoading&&<span className="text-center loader ml-2 p-2"></span>} 
            </button>
            <input type='hidden' name='userEmail' 
            onChange={handleChange} value={userEmail}
            />
            <input type='hidden' name='investmentID' 
            onChange={handleChange} value={id}
            />

            <input type='hidden' name='withdrawalCategory' 
            onChange={handleChange} value={withdrawalCategory}
            />
          </form>
        </div>
      </div>
  )
}

export default WithdrawalsObject



