import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../../stayhealthylogo.png';

const Navbar = () => {
    return (
    <nav>
      <div className="nav__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav__icon">
        <i className="fa fa-bars"></i>
      </div>
      <ul className="nav__links">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/health-blog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className="link">
          <Link to="/signup">
            <button className="btn1">Sign Up</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/login">
            <button className="btn1">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;