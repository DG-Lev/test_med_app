import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Submit form (e.g., send to API)
            alert("Login successful!");
        }
    };

    return (
        <div className="container">
            {/* Login heading */}
            <div className="login-text1">
                <h2>Login</h2>
            </div>
            {/* Additional login text with a link to Sign Up page */}
            <div className="login-text2">
                Are you a new member?
                <span>
                    <Link to="/signup" style={{ color: "#2190ff" }}>
                        Sign Up Here
                    </Link>
                </span>
            </div>
            <br />
            {/* Login form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                {/* Form group for email input */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        aria-describedby="helpId"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </div>
                {/* Form group for password input */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        aria-describedby="helpId"
                        required
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                </div>
                {/* Button group for login and reset buttons */}
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                    >
                        Login
                    </button>
                    <button
                        type="reset"
                        className="btn btn-danger mb-2 waves-effect waves-light"
                        onClick={() => {
                            setForm({ email: "", password: "" });
                            setErrors({});
                        }}
                    >
                        Reset
                    </button>
                </div>
                <br />
                {/* Additional login text for 'Forgot Password' option */}
                <div className="login-text2">Forgot Password?</div>
            </form>
        </div>
    );
};

export default Login;