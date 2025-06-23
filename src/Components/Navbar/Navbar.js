import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../../stayhealthylogo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("auth-token"));
    const [username, setUsername] = useState(sessionStorage.getItem("name") || "");
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    useEffect(() => {
        // Listen for storage changes (e.g., login from another tab)
        const handleStorage = () => {
            setIsLoggedIn(!!sessionStorage.getItem("auth-token"));
            const name = sessionStorage.getItem("name");
            if (name) {
                setUsername(name);
            } else {
                setUsername("");
            }
        };
        window.addEventListener("storage", handleStorage);

        // Listen for login/logout in this tab
        const interval = setInterval(() => {
            setIsLoggedIn(!!sessionStorage.getItem("auth-token"));
            const name = sessionStorage.getItem("name");
            if (name) {
                setUsername(name);
            } else {
                setUsername("");
            }
        }, 500);

        // Set username on mount
        const name = sessionStorage.getItem("name");
        if (name) {
            setUsername(name);
        }

        return () => {
            window.removeEventListener("storage", handleStorage);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setUsername("");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="nav__icon" onClick={() => setMenuOpen(!menuOpen)}>
                <i className="fa fa-bars"></i>
            </div>
            <ul className={`nav__links${menuOpen ? " active" : ""}`}>
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
                {isLoggedIn && username && (
                    <li
                        className="link profile-link"
                        style={{ marginRight: "10px", fontWeight: "bold", position: "relative" }}
                        onMouseEnter={() => setProfileDropdown(true)}
                        onMouseLeave={() => setProfileDropdown(false)}
                    >
                        {`Welcome, ${username}!`}
                        {profileDropdown && (
                            <div className="profile-dropdown">
                                <Link to="/profile" className="profile-dropdown-item">
                                    Your Profile
                                </Link>
                                <Link to="/reports" className="profile-dropdown-item">
                                    Your Reports
                                </Link>
                            </div>
                        )}
                    </li>
                )}
                {isLoggedIn ? (
                    <>
                        <li className="link">
                            <Link to="/instant-consultation">
                                <button className="btn1">Book Consultation</button>
                            </Link>
                        </li>
                        <li className="link">
                            <button className="btn1" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>      
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
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;