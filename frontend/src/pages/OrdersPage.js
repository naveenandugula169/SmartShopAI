import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    const mockOrders = [
      {
        id: "#ORD-001",
        date: "March 15, 2024",
        status: "delivered",
        total: 234.99,
        items: [
          { name: "Wireless Headphones", qty: 1, price: 89.99 },
          { name: "USB-C Cable", qty: 2, price: 14.99 }
        ],
        tracking: "1Z999AA10123456784"
      },
      {
        id: "#ORD-002",
        date: "March 10, 2024",
        status: "in-transit",
        total: 89.50,
        items: [
          { name: "Laptop Stand", qty: 1, price: 89.50 }
        ],
        tracking: "1Z999AA10123456785"
      },
      {
        id: "#ORD-003",
        date: "March 5, 2024",
        status: "delivered",
        total: 145.47,
        items: [
          { name: "Wireless Mouse", qty: 1, price: 45.99 },
          { name: "Monitor Light Bar", qty: 1, price: 99.48 }
        ],
        tracking: "1Z999AA10123456786"
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "status-delivered";
      case "in-transit":
        return "status-transit";
      case "pending":
        return "status-pending";
      default:
        return "status-cancelled";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return "✅";
      case "in-transit":
        return "🚚";
      case "pending":
        return "⏳";
      default:
        return "❌";
    }
  };

  return (
    <div className="orders-page">
      <Navbar />

      <main className="orders-main">
        <div className="container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p>Track your purchases and manage your orders</p>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📦</p>
              <h2>No orders yet</h2>
              <p>Start shopping to create your first order</p>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map(order => (
                <div key={order.id} className={`order-card ${getStatusColor(order.status)}`}>
                  <div className="order-card-header">
                    <div>
                      <h3 className="order-number">{order.id}</h3>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div className="order-status-badge">
                      <span className="status-icon">{getStatusIcon(order.status)}</span>
                      <span className="status-text">{order.status.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="order-items">
                    <p className="items-label">Items:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="item-row">
                        <span>{item.name} x {item.qty}</span>
                        <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-tracking">
                    <p className="tracking-label">Tracking</p>
                    <code className="tracking-code">{order.tracking}</code>
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <span className="total-amount">${order.total.toFixed(2)}</span>
                    </div>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    >
                      {selectedOrder?.id === order.id ? "Hide Details" : "View Details"}
                    </button>
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="order-details">
                      <h4>Order Details</h4>
                      <div className="detail-row">
                        <span>Shipping Address:</span>
                        <p>123 Main St, City, State 12345</p>
                      </div>
                      <div className="detail-row">
                        <span>Payment Method:</span>
                        <p>•••• •••• •••• 4242</p>
                      </div>
                      <div className="detail-row">
                        <span>Estimated Delivery:</span>
                        <p>March 20, 2024</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
