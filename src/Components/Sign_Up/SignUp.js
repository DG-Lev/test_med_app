import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sign_Up.css";
import { API_URL } from '../../config';

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState([]); // always use an array
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError([]); // Clear previous API errors
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Submit form to API
            try {
                const response = await fetch(`${API_URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        password: form.password,
                        phone: form.phone,
                    }),
                });

                const json = await response.json();
                console.log(json); 

                if (json.authtoken) {
                    sessionStorage.setItem("auth-token", json.authtoken);
                    sessionStorage.setItem("name", form.name);
                    sessionStorage.setItem("phone", form.phone);
                    sessionStorage.setItem("email", form.email);
                    navigate("/");
                    window.location.reload();
                } else if (Array.isArray(json.error)) {
                    // If backend returns error as an array
                    setApiError(json.error.map(e => e.msg));
                } else if (json.errors && Array.isArray(json.errors)) {
                    setApiError(json.errors.map(e => e.msg));
                } else if (json.error) {
                    setApiError([json.error]);
                } else {
                    setApiError(["Registration failed."]);
                }
            } catch (err) {
                setApiError(["Network error. Please try again."]);
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: "5%" }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1">
                    Already a member?
                    <span>
                        <Link to="/login" style={{ color: "#2190ff" }}>
                            Login
                        </Link>
                    </span>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
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
                            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
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
                            {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
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
                            {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                        </div>
                        {apiError.length > 0 && apiError.map((err, idx) => (
                            <div key={idx} style={{ color: "red" }}>
                                {typeof err === "string" ? err : err.msg}
                            </div>
                        ))}
                        <div className="btn-group">
                            <button
                                type="submit"
                                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                            >
                                Submit
                            </button>
                            <button
                                type="reset"
                                className="btn btn-danger mb-2 waves-effect waves-light"
                                onClick={() => {
                                    setForm({ name: "", phone: "", email: "", password: "" });
                                    setErrors({});
                                    setApiError([]);
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;