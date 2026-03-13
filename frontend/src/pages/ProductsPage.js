import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { productsAPI } from "../api/products";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAll();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by search
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, priceRange, searchTerm]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cart.reduce((sum, item) => sum + item.quantity, 0));

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <Navbar />

      <main className="products-main">
        <div className="container">
          {/* Page Header */}
          <div className="products-header">
            <div className="header-content">
              <h1>Discover Amazing Products</h1>
              <p>Browse our curated collection with AI-powered recommendations</p>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          <div className="products-container">
            {/* Sidebar Filters */}
            <aside className="products-sidebar">
              <div className="filter-section">
                <h3 className="filter-title">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Price Range</h3>
                <div className="price-inputs">
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className="price-input"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    placeholder="Max"
                    className="price-input"
                  />
                </div>
                <p className="price-display">${priceRange[0]} - ${priceRange[1]}</p>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Categories</h3>
                <div className="category-list">
                  {["Electronics", "Accessories", "Home", "Fashion"].map(cat => (
                    <label key={cat} className="category-label">
                      <input
                        type="checkbox"
                        defaultChecked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(selectedCategory === cat ? "all" : cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary btn-block">Apply Filters</button>
            </aside>

            {/* Products Grid */}
            <div className="products-grid-wrapper">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading amazing products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search term</p>
                </div>
              ) : (
                <>
                  <div className="products-count">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  </div>
                  <div className="products-grid">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
