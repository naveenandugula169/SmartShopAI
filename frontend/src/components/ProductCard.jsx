import React from "react";

export default function ProductCard({ product, onAddToCart }) {
  const rating = Math.random() * 2 + 3.5; // Mock rating 3.5-5.5

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={`https://via.placeholder.com/250x250?text=${product.name}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-badge">
          {product.discount ? (
            <span className="discount-badge">-{product.discount}%</span>
          ) : (
            <span className="new-badge">NEW</span>
          )}
        </div>
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description?.substring(0, 60)}...</p>

        <div className="product-rating">
          <div className="stars">
            {"⭐".repeat(Math.floor(rating))}
            {rating % 1 !== 0 && "✨"}
          </div>
          <span className="rating-text">({Math.floor(Math.random() * 500)})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price}</span>
            {product.discount && (
              <span className="original-price">${(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
            )}
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
