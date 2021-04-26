import { Link } from "react-router-dom";

const Reserve=({accounts})=>{
  
  return(
    <div className="card border-0">
      <div className="card-body  shadow-lg">
      
        <table className="table table-striped table-bordered shadow-lg p-3">
          <thead>
          <tr>
            <th>S/N</th>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Account Reference Number</th>
            <th>Details</th>
          </tr>
          </thead>
      <tbody>
       {accounts.map((account,index)=>(
         <tr key={account.id}>
           <td>{index +1}</td>
           <td>{account.accountNumber}</td>
           <td>{account.accountName}</td>
           <td>{account.accountReference}</td>
           <td>
             <Link key={account.id} to={`reserved-account/${account.userId}`}>More Details</Link>
           </td>
         </tr>
       ))}
      </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reserve;