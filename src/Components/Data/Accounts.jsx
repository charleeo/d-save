import useFetch from './../customHooks/useFetch';
import Reserve from './resevedAccounts';
import { setURL } from './../../services/httpServices';


const AccountDetails=()=>{
  const {data:accounts,ispending,error} = useFetch(`${setURL()}/reserved-account/accounts-all`)
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
      {ispending && <div className="alert alert-info text-center "><span className="loader"></span></div>}
       {accounts && <Reserve accounts={accounts} />}
      {error && <p>{error}</p>}
    </div>
    </div>
  )
}
export default AccountDetails