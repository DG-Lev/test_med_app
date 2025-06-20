import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sign_Up.css";


const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{10,}$/.test(form.phone)) newErrors.phone = "Phone must be at least 10 digits";
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
            alert("Sign up successful!");
        }
    };

    return (
        <div className="container" style={{ marginTop: "5%" }}>
            {/* Main container with margin-top */}
            <div className="signup-grid">
                {/* Grid layout for sign-up form */}
                <div className="signup-text">
                    {/* Title for the sign-up form */}
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1">
                    {/* Text for existing members to log in */}
                    Already a member?
                    <span>
                        <Link to="/login" style={{ color: "#2190ff" }}>
                            Login
                        </Link>
                    </span>
                </div>
                <div className="signup-form">
                    {/* Form for user sign-up */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Start of the form */}
                        <div className="form-group">
                            {/* Form group for user's name */}
                            <label htmlFor="name">Name</label>
                            {/* Label for name input field */}
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="form-control"
                                placeholder="Enter your name"
                                aria-describedby="helpId"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {/* Text input field for name */}
                            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            {/* Form group for user's phone number */}
                            <label htmlFor="phone">Phone</label>
                            {/* Label for phone input field */}
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                className="form-control"
                                placeholder="Enter your phone number"
                                aria-describedby="helpId"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            {/* Tel input field for phone number */}
                            {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
                        </div>
                        <div className="form-group">
                            {/* Form group for user's email */}
                            <label htmlFor="email">Email</label>
                            {/* Label for email input field */}
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="form-control"
                                placeholder="Enter your email"
                                aria-describedby="helpId"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {/* Email input field */}
                            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            {/* Form group for user's password */}
                            <label htmlFor="password">Password</label>
                            {/* Label for password input field */}
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="form-control"
                                placeholder="Enter your password"
                                aria-describedby="helpId"
                                value={form.password}
                                onChange={handleChange}
                            />
                            {/* Password input field */}
                            {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                        </div>
                        <div className="btn-group">
                            {/* Button group for form submission and reset */}
                            <button
                                type="submit"
                                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                            >
                                Submit
                            </button>
                            {/* Submit button */}
                            <button
                                type="reset"
                                className="btn btn-danger mb-2 waves-effect waves-light"
                                onClick={() => {
                                    setForm({ name: "", phone: "", email: "", password: "" });
                                    setErrors({});
                                }}
                            >
                                Reset
                            </button>
                            {/* Reset button */}
                        </div>
                    </form>
                    {/* End of the form */}
                </div>
            </div>
        </div>
    );
};

export default SignUp;