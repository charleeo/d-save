import {useState} from 'react';
import httpServices from '../../services/httpServces';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import { toast } from 'react-toastify';
export default function Login(props){
  const [inputText, setInputText] = useState({
    email: "",
    password: ""
  })
  //  const [message,setMessage] = useState('')
   const [error,setError] = useState('')
   const [isLoading,setIsLoading] = useState(false);
  
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const {email,password}=inputText
  const handleSubmit = async e => {
    e.preventDefault()
    const {state}= props.location;

   const loginObject = {email,password}
   const url = `${httpServices.setURL()}/user/login`;
   try {
    setIsLoading(true)
    setError('')
    const responses = await httpServices.post(url, loginObject);
    auth.setJWT(responses.data.token)
    const message = responses.data.message;
    setIsLoading(false)
    setInputText({email:'',password:''})
    setError('')
    toast.success(message,{autoClose:5000})
    setTimeout(()=>{
      window.location = state ? state.from.pathname : "/";
    },5000)
   } catch (ex) {
    //  console.log(ex.resopnse)
    if(ex.response !== undefined || ex.statusCode < 500  ){setError(ex.response.data.error)}
    else {toast.error('There was an unexpected error. Please try again')}
    setIsLoading(false)
  }
}
if(auth.getCurrentUser()){ return <Redirect to= '/'/>}
 return  (
    
      <div className="row justify-content-center mt-5 ">
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
            <div className='card-header '>
              <h1 className="text-center">Login To Account</h1>
            </div>
            <div className='card-body shadow-lg'>             
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' 
                   placeholder="enter your account's email"
                    value={email}
                    name="email" 
                    onChange={onChange}
                    className="form-control" />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input type='password'
                  placeholder="enter your password"
                  value={password}
                  name="password"
                  onChange={onChange}
                  className="form-control"/>
                </div>
                {/* <div className='form-group'>
                  <label htmlFor='gender'>Gender</label>
                  <select value={inputText.gender}  name="gender"  onChange={onChange}
                  className="form-control">
                    <option value="">please select one</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div> */}
              <div className="d-flex justify-content-center">
                <button className="btn btn-info btn-sm" disabled={isLoading||(!password || !email)?true:false}>
                  {isLoading?<span className="loader"></span>:"Login Here"}
                </button>  
              </div>
                  {error && <p className="alert alert-danger text-center">{error}</p>}
              </form>
            </div>
            <hr/>
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div><small>Don't have an account</small>?  <Link to='/register'>Register</Link> 
                </div>
              </div>
              <div className="col-md-7">
                <div >Forgot Password?  <Link to='/forgot-password'>Recover Password</Link>
                </div>
              </div>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    )
}