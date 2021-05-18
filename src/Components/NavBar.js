import React,{useState} from 'react';
import { Link , useRouteMatch} from 'react-router-dom';
const NavBar = ({user})=>{
  const [dropdown,setDropdown] = useState(false);
  const [dropdownProfile,setDropdownProfile] = useState(false)
  const {url} = useRouteMatch()
  const  handleMouseEnter=()=>{
     setDropdown(true)
  }

  const  handleMouseLeave=()=>{
    setDropdown(false)
 }

 const  handleMouseEnterProfile=()=>{
  
  setDropdownProfile(true)
}

const  handleMouseLeaveProfile=()=>{
 setDropdownProfile(false)
}

const [colorChange, setColorchange] = useState(false);
const changeNavbarColor = () =>{
   if(window.scrollY >= 60){
     setColorchange(true);
   }
   else{
     setColorchange(false);
   }
};
window.addEventListener('scroll', changeNavbarColor);

  return (
<>
<nav className={`navbar navbar-expand-lg navbar-light   ${colorChange?"nav-bg-c":"nav-bg"}`}>
    <Link className="navbar-brand " to="/" id='logo'>kolo-vest</Link>
    <button className="navbar-toggler bg-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to={`${url}`}>Home <span className="sr-only">(current)</span>
          </Link>
        </li >
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>           
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/how-it-works">How-it-works</Link>           
        </li>
        {user && 
        <>
          <div className='dropdown-wrapper'onMouseLeave={handleMouseLeave}>
            <li className="nav-item nav-link dropdown-button"  onMouseEnter={handleMouseEnter} >
              Transactions<span></span>
            </li>
            <div className={`${dropdown?'show-dropdown-items':'dropdown-items'}`}>
              <li className="nav-item">
                <Link className="nav-link" to="/reserve-account">Reserved Account</Link>           
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/withdrawal/histories">Withdrawals Histories</Link>           
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deposit/histories">Investments</Link>           
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/savings">Savings</Link>           
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/online-deposit">Web-payment</Link>           
              </li>
            </div>
          </div>

          <div  className='dropdown-wrapper'onMouseLeave={handleMouseLeaveProfile}>
            <li className="nav-item nav-link dropdown-button"  onMouseEnter={handleMouseEnterProfile} >
              Profile<span></span>
            </li>
            <div className={`${dropdownProfile?'show-dropdown-profile':'dropdown-items'}`}>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/logout">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Settings</Link>
              </li> */}
              <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </div>
          </div>
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