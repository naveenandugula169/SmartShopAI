import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="logo">SmartShop<span>AI</span></h1>
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Sign in to continue your smart shopping experience</p>

        <form onSubmit={onSubmit} className="login-form">
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
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
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
