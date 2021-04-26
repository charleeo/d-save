const ReserveAccountDetails=({user,data,ispending,error})=>{
  return(
    <>
      {ispending && <div className="alert alert-info text-center "> 
        <span className="loader"></span>
      </div>}
      <div className="row justify-content-center align-self-center mt-4">
        <div className="col-md-6 col-sm-12">
          <div className="card shadow py-5 ">
          <h3 className="text-center">{user.email} Account </h3>
          {data && <div className="card-body">
            <ul className="list-group shadow-lg">
              <li className="list-group-item">Account Number| <b>{data.data.accountNumber}</b></li>
              <li className="list-group-item">Account Name| <b>{data.data.accountName}</b></li>
              <li className="list-group-item">Account Status| <b>{data.data.status}</b></li>
              <li className="list-group-item">Reference|<b> {data.data.reservationReference}</b></li>
              <li className="list-group-item">Currency Code|<b> {data.data.currencyCode}</b></li>
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