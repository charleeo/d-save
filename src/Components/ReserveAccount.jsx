import {useState} from 'react';
import httpServices,{setURL} from '../services/httpServces';
import useFetch from './customHooks/useFetch';
import auth from '../services/authService';
import ReserveAccountDetails from './Data/reservedAccountDetails';

const ReserveAccount=()=>{
  const user = auth.getCurrentUser()
  let userId;
  if(user !== null){
    userId = user.userId
  }
  const {data,ispending,error} = useFetch(`${setURL()}/reserved-account/account-details/${userId}`);

  const config = httpServices.setJwtHeaders()
  const [inputText, setInputText] = useState({
    BVN: "",
    accountName: ""
  })
   const [message,setMessage] = useState('')
   const [errors,setError] = useState('')
   const[isLoading,setIsLoading] = useState(false)
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }
  const {accountName,BVN}=inputText

  const handleSubmit = async e => {
    const user = auth.getCurrentUser();
    const email = user.email
    e.preventDefault()
   const reserveAccount = {accountName,customerBvn:BVN,customerEmail:email}
   const url = `${setURL()}/gateway/reserve-account`;
   try {
     setMessage('')
     setError('')
     setIsLoading(true)
    const responses = await httpServices.post(url, reserveAccount,config);
    const message = responses.data.message;
    setMessage(message)
    setInputText({BVN:'',accountName:''})
    setError('')
    setIsLoading(false)
    window.location.reload(true) ;
   } catch (ex) {
    if(ex.response !== undefined )setError(ex.response.data.error)
    else setError('There was an unexpected error. Please try again')
    setIsLoading(false)
  }
}
if(data){return  <ReserveAccountDetails 
user ={user} 
data={data} 
error={error} 
ispending={ispending}
/>
}
 else{ return  (
   <>
      <div className="row justify-content-center mt-5 ">
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
            <div className='card-header '>
              <h1 className="text-center">Reserve An Account</h1>
            </div>
            <div className='card-body shadow-lg'>
              
              {message && <p className="alert alert-success text-center">{message}</p>}
              <form onSubmit={handleSubmit}>
              <div className='form-group'>
                  <label htmlFor='BVN'>BVN </label>
                  <input type='text'
                  placeholder="enter your BVN"
                  value={inputText.BVN}
                  name="BVN"
                  onChange={onChange}
                  className="form-control"/>
                </div>
                <div className='form-group'>
                  <label htmlFor='accountName'>Account Name</label>
                  <input type='text' 
                   placeholder="enter your account's Name here"
                    value={inputText.accountName}
                    name="accountName" required
                    onChange={onChange}
                    className="form-control" />
                </div>
                
                <div className="d-flex justify-content-center mb-5">
                  <button className="btn btn-info btn-sm" disabled={isLoading| !accountName?true:false}>
                    {isLoading?<span className="loader"></span>:"Login Here"}
                  </button>  
                </div>
                  {errors && <p className="alert alert-danger text-center">{errors}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    )
 }
}

export default ReserveAccount