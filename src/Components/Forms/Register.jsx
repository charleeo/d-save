import  React,{useState} from 'react';
import Input from './Input';

import httpServices from '../../services/httpServices'
import { Link, Redirect } from 'react-router-dom';
import auth from './../../services/authService';
import { toast } from 'react-toastify';

const Register = (props)=>{
  const data = {
    email:"",password:"",name:""
  }
  const [values,setValues]= useState(data||{});
  const handleChange=(e)=>{
    setValues({
      ...values,[e.target.name]:e.target.value
    })
  }
  
  const [error,setError] = useState('')
  const [isLoading,setIsLoading] = useState(false);
  
  const {email,password,name} = values;
  const  handleSubmit= async(e)=>{
    
    e.preventDefault()
    const dataToSubmit = {email,password,name};
    const url = `${httpServices.setURL()}/user/register`;
   try {
     
    setIsLoading(true);
    setError('')
    const responses = await httpServices.post(url, dataToSubmit);
    const message = responses.data.message;
    setIsLoading(false)
    setValues({email:'',password:'',name:''})
    setError('')
    toast.success(message)
    setTimeout(function(){
      props.history.push('/login')
    },500)
   } catch (ex) {
    if(ex.response !== undefined ){setError(ex.response.data.error)}
    else {toast.error('There was an unexpected error. Please try again')}
    setIsLoading(false)
  }
  }
  if(auth.getCurrentUser()) return <Redirect to= '/'/>
  return(
    <div className="row justify-content-center   register">
      <div className="col-md-6 col-sm-12  shadow bg-white py-2">
        <div className="card  ">
          <div className="card-header">
            <h4 className='text-center'>Register To Get Started</h4> 
          </div>
          <div className="card-body p-4">
          </div>
          <form onSubmit={handleSubmit} className='shadow-lg p-3'>
            <Input
              name ='email'
              type="email"
              label="Email Address"
              handleChange={handleChange}
              value={values.email}
            />
            <Input
              name ='name'
              label="User Name"
              handleChange={handleChange}
              value={values.name}
              placeholder='enter your user name here'
            />
            <Input
              name ='password'
              label="Password"
              type="password"
              handleChange={handleChange}
              value={values.password}
              placeholder='enter your password'
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-bg" 
                disabled={isLoading || !email || !name || !password?true:false}>
                {isLoading &&<small className="loader"></small>} Register
              </button>  
            </div>
            {error && <div className='alert alert-warning text-center mt-3'>{error}</div>}
          </form>
            <hr/>
            <div className="">
              <p className='text-center'>Have An Account? &nbsp;<Link to='/login'>Login</Link> </p>
              
              <Link to='/' className='d-block text-center'>Home Page</Link>
            </div>
        </div>
      </div>
    </div>
  )
}
export default Register
