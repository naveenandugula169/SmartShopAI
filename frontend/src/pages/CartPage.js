import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    const updated = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const applyCoupon = () => {
    const coupons = {
      "SAVE10": 10,
      "SAVE20": 20,
      "WELCOME": 15
    };
    if (coupons[coupon.toUpperCase()]) {
      setDiscount(coupons[coupon.toUpperCase()]);
      alert("Coupon applied!");
    } else {
      alert("Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  return (
    <div className="cart-page">
      <Navbar />

      <main className="cart-main">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start shopping to add items to your cart</p>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items">
                <div className="items-header">
                  <span>Product</span>
                  <span className="hide-mobile">Price</span>
                  <span>Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={`https://via.placeholder.com/80x80?text=${item.name}`}
                        alt={item.name}
                      />
                    </div>

                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p className="item-price-mobile">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <span className="item-price hide-mobile">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <span className="item-total text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <aside className="order-summary">
                <h2>Order Summary</h2>

                {/* Coupon */}
                <div className="coupon-section">
                  <label>Apply Coupon Code</label>
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="coupon-input"
                    />
                    <button onClick={applyCoupon} className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </div>
                  <p className="coupon-hint">Try: SAVE10, SAVE20, WELCOME</p>
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="price-row discount">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="price-row">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="price-row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="btn btn-primary btn-block">
                  Proceed to Checkout
                </button>

                {/* Shipping Info */}
                <div className="shipping-info">
                  <div className="info-item">
                    <span className="info-icon">�</span>
                    <div>
                      <p className="info-label">Free Shipping</p>
                      <p className="info-text">On orders over $50</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🔒</span>
                    <div>
                      <p className="info-label">Secure Checkout</p>
                      <p className="info-text">SSL encrypted</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">↩️</span>
                    <div>
                      <p className="info-label">Easy Returns</p>
                      <p className="info-text">30-day guarantee</p>
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link to="/products" className="btn btn-ghost btn-block">
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
