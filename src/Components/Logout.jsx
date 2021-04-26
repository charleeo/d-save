import {useEffect} from "react";
import auth from "../services/authService";
import { toast } from "react-toastify";
const Logout=()=> {
  useEffect(()=>{
     auth.logout()
    toast.info("Logout successfull",{autoClose:5000});
    setTimeout(()=>{
      window.location = "/";
    },5000)
  }) 
  return(null)
}

export default Logout;
