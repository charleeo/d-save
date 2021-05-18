import React from 'react'
import { Link } from 'react-router-dom'

export const HowItWorks=()=>{
  return(<>
  <div className='row justify-content-center'>
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h4 className='text-center'>How It Works</h4>
        </div>
        <div className="card-body shadow-lg">
          <p>
            Hello There! We are pleased to have you around. This is a brief outline on how to navigate and use the platform.
          </p>
          <p>
            Deposits from <b>5000 and below</b> are considered as <b>Savings</b> while any deposit amount that is larger than <b>5000</b> falls into the <b>investment</b> category. It is only the <b>Investment option</b> that gets interest which ranges from <b>10% to 15%</b> depending on the amount deposited.
          </p>
          <p>
            All you have tot do is register and click on  &nbsp;
            <Link to='/reserve-account'>Reserve Account</Link> link to generate an account number which you can use either in your Banking App or as USSD. 
          </p>
          <p>
            At the moment, we are still in the developmental stage. To deposit money i.e invest or save money in the system, use the <Link to='online-deposit'>Web Pay</Link> to deposit funds intothe platform. You can also use this web simulator <a href="https://websim.sdk.monnify.com/?#/bankingapp" target="_blank" rel="noopener noreferrer">Simulator</a> to make your deposit copying and pasting the account number you generated above
          </p>
        </div>
      </div>
    </div>
  </div>
  </>)
}