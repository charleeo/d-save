import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = ({user})=>{
  return (
<>
<nav className="navbar navbar-expand-lg navbar-light fixed-top ">
    <Link className="navbar-brand " to="/">LOGO</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        {user && 
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/reserve-account">Reserved Account</Link>           
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/online-deposit">Deposit Online</Link>           
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        </>
        }
        
        {!user &&<>    
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  " to="/login">Login</Link>
          </li>
          </>
        }
      </ul>
    </div>
</nav>
</>
  )
}
export default NavBar;