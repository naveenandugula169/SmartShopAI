import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./UserProfilePage.css";

export default function UserProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (in real app, would call API)
    localStorage.setItem("user", JSON.stringify({
      ...user,
      ...formData
    }));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <div className="container">
          <div className="profile-grid">
            {/* Sidebar */}
            <aside className="profile-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <h2>{user.username}</h2>
                <p className="member-since">Member since Jan 2024</p>
                
                <nav className="profile-nav">
                  <button className="profile-nav-item active">
                    👤 Profile
                  </button>
                  <button className="profile-nav-item">
                    📦 Orders
                  </button>
                  <button className="profile-nav-item">
                    ❤️ Wishlist
                  </button>
                  <button className="profile-nav-item">
                    ⚙️ Settings
                  </button>
                  <button className="profile-nav-item">
                    🔒 Security
                  </button>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="profile-content">
              {/* Profile Card */}
              <div className="profile-card-main">
                <div className="card-header">
                  <h1>Personal Information</h1>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="profile-info">
                    <div className="info-row">
                      <span className="label">Username</span>
                      <span className="value">{user.username}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Email</span>
                      <span className="value">{user.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Phone Number</span>
                      <span className="value">{user.phoneNumber || "Not provided"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-content">
                    <p className="stat-label">Total Orders</p>
                    <p className="stat-value">12</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <p className="stat-label">Reviews</p>
                    <p className="stat-value">8</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-content">
                    <p className="stat-label">Wishlist Items</p>
                    <p className="stat-value">24</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <p className="stat-label">Total Spent</p>
                    <p className="stat-value">$1,245</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="profile-card-main">
                <h2>Recent Orders</h2>
                <div className="orders-list">
                  <div className="order-item">
                    <div className="order-header">
                      <span className="order-id">Order #12345</span>
                      <span className="order-status delivered">Delivered</span>
                    </div>
                    <p className="order-date">March 15, 2024</p>
                    <p className="order-amount">$234.99</p>
                  </div>
                  <div className="order-item">
                    <div className="order-header">
                      <span className="order-id">Order #12344</span>
                      <span className="order-status pending">Pending</span>
                    </div>
                    <p className="order-date">March 10, 2024</p>
                    <p className="order-amount">$89.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
