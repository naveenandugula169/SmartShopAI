import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const cartCount = localStorage.getItem("cartCount") || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartCount");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-wrapper">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">
              Smart<span className="logo-ai">Shop</span>
            </span>
            <span className="logo-ai-badge">AI</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/chatbot" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              AI Stylist
            </Link>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Cart Icon */}
            <Link to="/cart" className="nav-icon-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* User Menu */}
            {token && user ? (
              <div className="user-menu">
                <button
                  className="user-menu-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="user-avatar">{user.username?.charAt(0).toUpperCase()}</div>
                </button>

                {isUserMenuOpen && (
                  <div className="user-menu-dropdown">
                    <div className="user-menu-header">
                      <p className="user-name">{user.username}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <hr className="menu-divider" />
                    <Link to="/profile" className="menu-item">
                      👤 My Profile
                    </Link>
                    <Link to="/orders" className="menu-item">
                      📦 My Orders
                    </Link>
                    <Link to="/wishlist" className="menu-item">
                      ❤️ Wishlist
                    </Link>
                    <hr className="menu-divider" />
                    <button onClick={handleLogout} className="menu-item logout">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
