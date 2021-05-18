import {useState} from 'react';
import httpServices from '../../services/httpServices';
import { Link } from 'react-router-dom';
import renderBTN from './Button';
export default function ForgotPassword(){
  const [inputText, setInputText] = useState({
    email: "",
  })
   const [message,setMessage] = useState('')
   const [error,setError] = useState('')
   const [btnStatus,setBtnStatus] = useState(false)
   const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setBtnStatus(true)
   const {email}=inputText
   const loginObject = {email}
   const url = 'http://127.0.0.1:5000/user/resend-password/link';
   try {
    const responses = await httpServices.post(url, loginObject);
    const message = responses.data.message;
    setMessage(message)
    setInputText({email:''})
    setBtnStatus(false)
    setError('')
   } catch (ex) {
    console.log(ex.response)
    if(ex.response !== undefined )setError(ex.response.data.error)
    else setError('There was an unexpected error. Please try again')
    setBtnStatus(false)
  }
}
  return  (
      <div className="row justify-content-center forget-password ">
        <div className='col-md-6 col-sm-12'>
          <div className="card border-0 shadow p-3">
              <h4 className="text-center">Password Reset Link</h4>
            <div className='card-body shadow-lg'>
              {message && <p className="alert alert-success text-center">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' 
                   placeholder="enter your account's email to recover password"
                    value={inputText.email}
                    name="email" required
                    onChange={onChange}
                    className="form-control" />
                </div>
                <div className='form-group d-flex justify-content-start'>
                  {renderBTN("Send Reset Link","btn btn-sm btn-info",btnStatus)}
                </div>
                  {error && <p className="alert alert-danger text-center">{error}</p>}
              </form>
              <div className="d-flex ">
                <Link to='/login'>Go Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}