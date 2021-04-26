import React, { useState } from "react";
import { MdClose } from "react-icons/md"

import { FiMenu } from "react-icons/fi"
import { Link } from 'react-router-dom';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const links = [
    {
      id: 1,
      path: "/",
      text: "Home",
    },
    {
      id: 2,
      path: "/login",
      text: "Login",
    },
  ]
  
  return (
    <div className="header">
      <div className="logo-nav">
          <div className="logo-container">
            <Link to="/">
              Kolo-Invest
            </Link>
          </div>
          <ul className= {click ? "nav-options active" : "nav-options"}>
            {links.map(link=>(
              <li key={link.id} className="option" onClick={closeMobileMenu}>
              <Link to={link.path}>{link.text}</Link>
            </li>
            ))}
          </ul>
      </div>
      <ul className="desktop-view">
          {links.map(link=>(
            <li key={link.id} className="option" onClick={closeMobileMenu}>
            <Link to={link.path}>{link.text}</Link>
          </li>
          ))}
      </ul>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <MdClose className="menu-icon" />
        ) : (
          <FiMenu className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Header;