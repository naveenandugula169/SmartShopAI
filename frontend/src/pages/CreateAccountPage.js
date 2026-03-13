import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth";
import "./CreateAccountPage.css";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage(""); // clear error while typing
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await authAPI.register({
        username: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });

      console.log("Register success:", response);
      setSuccess(true);
    } catch (error) {
      console.error("Register error:", error);

      if (typeof error === "string") {
        setErrorMessage(error);
      } else if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1 className="logo">
          SmartShop<span>AI</span>
        </h1>

        <h2 className="title">Create an Account</h2>
        <p className="subtitle">
          Start your intelligent shopping journey 🚀
        </p>

        {success && (
          <div style={{ marginTop: 10, marginBottom: 10, color: "#22c55e" }}>
            Account created successfully!{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                border: "none",
                color: "#38bdf8",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                marginLeft: 4,
              }}
            >
              Click here to login
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="register-form">

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
