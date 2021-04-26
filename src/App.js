import "bootstrap/dist/css/bootstrap.css";

// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import {ToastContainer} from 'react-toastify';
import './css/App.css';
import HomePage from "./Components/HomePage";
import Login from './Components/Forms/Login';
import NavBar from "./Components/NavBar";
import UserDetails from './Components/Data/UserDetails';
import Register from './Components/Forms/Register';
import ForgotPassword from './Components/Forms/ForgotPassword';
import auth  from './services/authService';
import ProtectedRoute from "./Components/common/ProtectedRoute";
import ReserveAccount  from './Components/ReserveAccount';
import Logout from './Components/Logout';
import Home from "./Components/Data/Home";
import { NotFound } from './Components/NotFound';
import AccountDetails from './Components/Data/Accounts';

import 'react-toastify/dist/ReactToastify.css'; 
// toast.configure()
import {ToastContainer} from 'react-toastify'
import DepositOnline from './Components/oline-payment';
import { Footer } from './Components/footer';

function App() {
  const [user,setUser] = useState('');    
  useEffect(()=>{
    const token = auth.getCurrentUser()
    setUser(token)
  },[])
  
  

  return (
    <div className="App">
      <Router>
        
        <NavBar user ={user} />
        <ToastContainer/>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login}/>
          <Route path = '/home'component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/user/:id">
            <UserDetails/>
          </Route>
          <ProtectedRoute path='/reserved-accounts' component={AccountDetails} />
          <ProtectedRoute path="/reserve-account" component={ReserveAccount}  />
          <Route path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute path="/online-deposit" component={DepositOnline}/>
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
