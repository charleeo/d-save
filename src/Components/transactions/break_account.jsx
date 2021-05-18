import React from 'react'
import { Link,useParams } from 'react-router-dom'

const BreakAccount = () => {
  const {id} = useParams();
  const handleAccountDetails =()=>{
    localStorage.setItem('break-account','break')
  }
  const handleCancel=()=>{
     localStorage.removeItem('break-account')
  }
  return (
    <>
    <div className="row justify-content-center px-5">
      <div className="col-md-6 col-sm-10">
        <div className="card border-0 card-body shadow-lg">
          <p>
            You have chosen to withdraw your investment before the due time. This will attract a penalty fee of 4% of the investment you are withdrawing from and the same time, you will not have any interest
          </p>
          <div>
            <Link to ='/deposit/histories'
            onClick={handleCancel}
             className='btn btn-bg mr-5'>Go Back</Link>
            <Link to={`/withdrawals/${id}`}
            onClick={handleAccountDetails} 
            className='btn btn-warning'>Proceed</Link>
          </div>
        </div>
      </div>
    </div>
      </>
    );
}
 
export default BreakAccount;