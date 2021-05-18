const ReserveAccountDetails=({user,record,ispending,error})=>{
  const {data} =record;
  return(
    <>
      {ispending && <div className="alert alert-info text-center "> 
        <span className="loader"></span>
      </div>}
      <div className="row justify-content-center align-self-center mt-3">
        <div className='col-md-4 col-sm-8 px-5'>
          <h2>NOTE</h2> <hr/>
          <p> Please use the details below to deposit money. It works with the same way you transfer money using USSD or your mobile banking APP.</p>
          <p>You can save  this <b> {data.accountNumber}</b> account number as your beneficianry in your mobile banking APP</p>
        </div>
        <div className="col-md-6 col-sm-8 ">
          <div className="card shadow py-2 ">
          <h6 className="text-center pl-3 border-bottom">{user.name}  Account Information</h6>
          {data && <div className="card-body">
            <ul className="list-group shadow-lg text-center">
              <li className="list-group-item">Account Number| <b>{data.accountNumber}</b></li>
              <li className="list-group-item">Bank Name| <b>{data.bankName}</b></li>
              <li className="list-group-item">Bank Code| <b>{data.bankCode}</b></li>
              <li className="list-group-item">Account Name| <b>{data.accountName}</b></li>
              <li className="list-group-item">Account Status| <b>{data.status}</b></li>
              <li className="list-group-item">Reference|<b> {data.reservationReference}</b></li>
              <li className="list-group-item">Currency Code|<b> {data.currencyCode}</b></li>
            </ul>
          </div>
          }
          </div>
        </div>
      </div>
      {error && <p className="alert alert-warning">{error}</p>}
    </>
  )
}



export default ReserveAccountDetails