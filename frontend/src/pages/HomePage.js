import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      user = JSON.parse(stored);
    }
  } catch (e) {
    // ignore parse errors and treat as logged out
  }

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="home-page">
      <header className="home-hero">
        <nav className="home-nav">
          <div className="home-logo">
            SmartShop<span>AI</span>
          </div>
          <div className="home-nav-links">
            <Link to="/products">Shop</Link>
            <Link to="/chatbot">AI Stylist</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="home-nav-cta">
            {isLoggedIn && user ? (
              <div className="home-user-menu">
                <button
                  className="home-user-avatar"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="avatar-circle">{user.username?.charAt(0).toUpperCase()}</div>
                  <span className="user-name-display">{user.username}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="home-user-dropdown">
                    <div className="dropdown-header">
                      <p className="dropdown-user-name">{user.username}</p>
                      <p className="dropdown-user-email">{user.email}</p>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link to="/profile" className="dropdown-item">
                      👤 My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      📦 My Orders
                    </Link>
                    <Link to="/cart" className="dropdown-item">
                      🛒 My Cart
                    </Link>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="ghost-btn">Sign In</Link>
                <Link to="/register" className="solid-btn">Get Started</Link>
              </>
            )}
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="pill">Personalized - Faster - Smarter</div>
            {isLoggedIn && user ? (
              <>
                <h1>
                  Welcome back, <span className="username-highlight">{user.username}</span>
                </h1>
                <p>
                  Your personalized shopping experience is ready. Let's find something amazing for you with our AI Stylist.
                </p>
              </>
            ) : (
              <>
                <h1>
                  Shop with an AI concierge
                  <span> that gets your taste.</span>
                </h1>
                <p>
                  SmartShop AI curates products, compares prices, and builds carts in
                  seconds. Tell us your vibe and let the assistant do the heavy
                  lifting.
                </p>
              </>
            )}
            <div className="hero-actions">
              <Link to="/products" className="solid-btn">Explore Products</Link>
              <Link to="/chatbot" className="ghost-btn">Chat with AI</Link>
            </div>
            <div className="hero-stats">
              <div>
                <h3>12k+</h3>
                <p>Happy shoppers</p>
              </div>
              <div>
                <h3>4.9</h3>
                <p>Avg. rating</p>
              </div>
              <div>
                <h3>40%</h3>
                <p>Faster checkout</p>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <h4>Today's Smart Picks</h4>
              <div className="panel-row">
                <div>
                  <p className="label">Smart Sneakers</p>
                  <span className="meta">Lightweight - 20% off</span>
                </div>
                <span className="price">$89</span>
              </div>
              <div className="panel-row">
                <div>
                  <p className="label">AI Noise-Cancel Buds</p>
                  <span className="meta">Top rated - 2-day ship</span>
                </div>
                <span className="price">$129</span>
              </div>
              <div className="panel-row">
                <div>
                  <p className="label">Minimalist Work Bag</p>
                  <span className="meta">Vegan leather - New</span>
                </div>
                <span className="price">$74</span>
              </div>
              <button className="panel-btn">Build My Cart</button>
            </div>
            <div className="panel-card muted">
              <h4>AI Concierge</h4>
              <p>
                "I found three outfits that match your campus vibe and stay
                under $150. Want a color swap?"
              </p>
              <div className="panel-tags">
                <span>Streetwear</span>
                <span>Eco</span>
                <span>Monochrome</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="home-section">
        <div className="section-header">
          <h2>Why SmartShop AI feels different</h2>
          <p>Personalized intelligence blended with instant convenience.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Hyper-personalized feeds</h3>
            <p>Tell the AI your style, budget, and occasion. It learns fast.</p>
          </div>
          <div className="feature-card">
            <h3>Smart price intelligence</h3>
            <p>We compare live prices and alert you when deals drop.</p>
          </div>
          <div className="feature-card">
            <h3>Instant bundles</h3>
            <p>Get ready-made carts for trips, events, and everyday needs.</p>
          </div>
        </div>
      </section>

      <section className="home-section split">
        <div>
          <h2>Your taste, translated by AI</h2>
          <p>
            Snap a screenshot or describe your vibe. The assistant matches you
            with verified brands and ships quickly. No more endless scrolling.
          </p>
          <div className="step-grid">
            <div className="step-card">
              <span>01</span>
              <h4>Share your intent</h4>
              <p>Outfit, gadget, or grocery list - done.</p>
            </div>
            <div className="step-card">
              <span>02</span>
              <h4>AI builds the cart</h4>
              <p>It balances price, ratings, and delivery speed.</p>
            </div>
            <div className="step-card">
              <span>03</span>
              <h4>Approve and ship</h4>
              <p>Swap items or checkout instantly.</p>
            </div>
          </div>
        </div>
        <div className="glass-card">
          <h3>Trending bundles</h3>
          <div className="bundle">
            <div>
              <p className="label">Weekend Getaway</p>
              <span className="meta">7 items - Under $210</span>
            </div>
            <button>View</button>
          </div>
          <div className="bundle">
            <div>
              <p className="label">WFH Upgrade Kit</p>
              <span className="meta">5 items - 2-day ship</span>
            </div>
            <button>View</button>
          </div>
          <div className="bundle">
            <div>
              <p className="label">Eco Essentials</p>
              <span className="meta">6 items - Vegan picks</span>
            </div>
            <button>View</button>
          </div>
        </div>
      </section>

      <section className="home-section cta">
        <div>
          {isLoggedIn && user ? (
            <>
              <h2>Continue your shopping journey</h2>
              <p>Explore trending products, get AI recommendations, or check your orders.</p>
            </>
          ) : (
            <>
              <h2>Ready to shop smarter?</h2>
              <p>Start your AI-first shopping journey in under 60 seconds.</p>
            </>
          )}
        </div>
        <div className="cta-actions">
          {isLoggedIn && user ? (
            <>
              <Link to="/products" className="solid-btn">Browse Products</Link>
              <Link to="/orders" className="ghost-btn">View Orders</Link>
            </>
          ) : (
            <>
              <Link to="/register" className="solid-btn">Create Account</Link>
              <Link to="/login" className="ghost-btn">Sign In</Link>
            </>
          )}
        </div>
      </section>

      <footer className="home-footer">
        <p>SmartShop AI - Built for modern shoppers</p>
        <div className="footer-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/chatbot">AI Assistant</Link>
        </div>
      </footer>
    </div>
  );
}
