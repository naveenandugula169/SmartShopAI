#!/bin/bash

# SmartShop AI — Sample Data Loader
# This script adds sample products and data to test the system
# Run after backend is started

set -e

API_URL="http://localhost:8080"
TOKEN=""

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║         SmartShop AI — Sample Data Loader                        ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Register a test user
echo "📝 Step 1: Registering sample user..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "sampleuser",
    "email": "sample@smartshop.com",
    "password": "SamplePass@123",
    "phoneNumber": "9876543210"
  }')

echo "Response: $REGISTER_RESPONSE"
echo ""

# Step 2: Login to get JWT token
echo "🔐 Step 2: Logging in to get JWT token..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "sampleuser",
    "password": "SamplePass@123"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"
echo ""

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token. Exiting."
  exit 1
fi

# Step 3: Add sample products
echo "📦 Step 3: Adding sample products..."
echo ""

PRODUCTS=(
  '{
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 2999.99,
    "category": "Electronics",
    "imageUrl": "https://via.placeholder.com/300x300?text=Headphones",
    "stockQuantity": 50,
    "rating": 4.5
  }'
  
  '{
    "name": "USB-C Cable",
    "description": "Durable USB-C charging and data cable",
    "price": 499.99,
    "category": "Accessories",
    "imageUrl": "https://via.placeholder.com/300x300?text=USB-C+Cable",
    "stockQuantity": 200,
    "rating": 4.2
  }'
  
  '{
    "name": "Laptop Stand",
    "description": "Adjustable laptop stand for better ergonomics",
    "price": 1999.99,
    "category": "Office",
    "imageUrl": "https://via.placeholder.com/300x300?text=Laptop+Stand",
    "stockQuantity": 30,
    "rating": 4.7
  }'
  
  '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with precision tracking",
    "price": 1299.99,
    "category": "Accessories",
    "imageUrl": "https://via.placeholder.com/300x300?text=Wireless+Mouse",
    "stockQuantity": 75,
    "rating": 4.4
  }'
  
  '{
    "name": "Monitor Light Bar",
    "description": "LED light bar for monitor to reduce eye strain",
    "price": 3999.99,
    "category": "Office",
    "imageUrl": "https://via.placeholder.com/300x300?text=Light+Bar",
    "stockQuantity": 20,
    "rating": 4.8
  }'
  
  '{
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard for gaming and typing",
    "price": 5999.99,
    "category": "Electronics",
    "imageUrl": "https://via.placeholder.com/300x300?text=Keyboard",
    "stockQuantity": 40,
    "rating": 4.6
  }'
)

COUNT=0
for PRODUCT in "${PRODUCTS[@]}"; do
  COUNT=$((COUNT + 1))
  echo "  Adding product $COUNT..."
  
  PRODUCT_RESPONSE=$(curl -s -X POST "$API_URL/api/products" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$PRODUCT")
  
  echo "    Response: $PRODUCT_RESPONSE" | head -c 80
  echo "..."
done

echo ""
echo ""

# Step 4: Verify products were added
echo "✅ Step 4: Verifying products..."
PRODUCTS_RESPONSE=$(curl -s -X GET "$API_URL/api/products" \
  -H "Authorization: Bearer $TOKEN")

PRODUCT_COUNT=$(echo "$PRODUCTS_RESPONSE" | grep -o '"id"' | wc -l)
echo "Total products in database: $PRODUCT_COUNT"
echo ""

# Summary
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ Sample Data Loaded!                        ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "Sample User Credentials:"
echo "  Username: sampleuser"
echo "  Email:    sample@smartshop.com"
echo "  Password: SamplePass@123"
echo "  Token:    $TOKEN"
echo ""
echo "Next Steps:"
echo "  1. Open http://localhost:3000 in your browser"
echo "  2. Log in with the credentials above"
echo "  3. Browse products and add to cart"
echo "  4. Test checkout flow"
echo ""
echo "API Testing:"
echo "  - Get all products: curl -X GET http://localhost:8080/api/products -H 'Authorization: Bearer $TOKEN'"
echo "  - Get user info:    curl -X GET http://localhost:8080/api/users/username/sampleuser -H 'Authorization: Bearer $TOKEN'"
echo ""
