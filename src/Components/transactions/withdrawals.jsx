import React from 'react';
import httpService from '../../services/httpServices'
import auth from './../../services/authService';
import { formatNumber, formatDate} from './../validate/validate';
import useFetch from './../customHooks/useFetch';

const WithdrawalHistory=()=>{
  const user = auth.getCurrentUser();
  let url = httpService.setURL();
  const  postUrl=`${url}/withdrawals/history-per-person/${user.email}`
  const {data, error,isPending} = useFetch(postUrl);
  return (
    <>
    {isPending?<div  style={{height:'50vh',background:"gray"}}><span className="loader" style={{position:'relative', top:'50%',left:"50%", display:'block'}}></span></div>:
    <div className="row justify-content-center pt-3">
      <div className='col-md-10 col-sm-12'>
        <div className="card p-5 shadow border-0">
          <div className="card-header">
            <h5 className='text-center'>WITHDRAWALS HISTORY </h5>
          </div>
          <div className="card-body shadow-lg">         
        <table className="table table-bordered table-striped table-responsive table-condensed">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Amount(&#8358;)</th>
              <th>Status</th>
              <th>Bank</th>
              <th>Acc/No</th>
              <th>Acc/Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {( error) &&<tr ><td colSpan='9' className='text-center text-danger'>{error}</td></tr>}
          {data && data.message.map((result,index)=>(
            <tr key={result.id }>
              <td>{index+1}</td>
              <td>{formatNumber(result.amount)}</td>
              <td>{result.status}</td>
              <td>{result.destinationBankName}</td>
              <td>{result.destinationAccountNumber}</td>
              <td>{result.destinationAccountName}</td>
              <td>{formatDate(result.createdAt)}</td>
            </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
        </div>
      </div>}
    </>
  )
}
export default WithdrawalHistory
