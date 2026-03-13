import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);

      await authAPI.login({
        email,
        phoneNumber,
        password,
      });

      // After successful login, redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (typeof error === "string") {
        setErrorMessage(error);
      } else if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="logo">SmartShop<span>AI</span></h1>
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Sign in to continue your smart shopping experience</p>

        <form onSubmit={onSubmit} className="login-form">
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number (optional)</label>
            <input
              type="tel"
              placeholder="Or enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="footer">
          <p>
            New to SmartShop-AI? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
