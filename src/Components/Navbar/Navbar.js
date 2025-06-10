import React from "react";
import "./Navbar.css";
import logo from '../../stayhealthylogo.png';

const Navbar = () => {
    return (
    <nav>
      <div className="nav__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav__icon" onClick="{handleClick}">
        <i className="fa fa-bars"></i>
      </div>
      <ul className="nav__links">
        <li className="link">
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        <li className="link">
          <a href="#">Health Blog</a>
        </li>
        <li className="link">
          <a href="#">Reviews</a>
        </li>
        <li className="link">
          <a href="../Sign_Up//Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;