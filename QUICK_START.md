# SmartShop AI — Quick Start Guide

## 🚀 Run Everything with One Command

### Option 1: Start Both Backend & Frontend (Separate Terminals)

**Terminal 1 — Backend:**
```bash
cd /Users/naveen/Desktop/SmartShop-AI/backend
./mvnw -DskipTests clean package
java -jar target/smartshop-backend-0.0.1-SNAPSHOT.jar
```
Expected output: `Started SmartshopBackendApplication` ✅

**Terminal 2 — Frontend:**
```bash
cd /Users/naveen/Desktop/SmartShop-AI/frontend
npm start
```
Expected output: `Compiled successfully!` ✅

---

## 📱 Access the Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React UI |
| Backend API | http://localhost:8080 | REST API |
| H2 Console | http://localhost:8080/h2-console | Database UI |

---

## 🧪 Test the APIs (Command Line)

### 1. Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123!",
    "phoneNumber": "9876543210"
  }'
```

### 2. Login & Get Token
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Password123!"
  }'
```
Response will include: `"token": "eyJhbGciOiJIUzI1NiJ9..."`

### 3. Use Token to Access Protected Endpoints
```bash
TOKEN="eyJhbGciOiJIUzI1NiJ9..."  # Replace with actual token from login

# Get all products
curl -X GET http://localhost:8080/api/products \
  -H "Authorization: Bearer $TOKEN"

# Get user info
curl -X GET http://localhost:8080/api/users/username/testuser \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠️ Common Issues & Solutions

### Issue: Port 8080 Already in Use
```bash
# Find and kill the process
lsof -i :8080 | grep java | awk '{print $2}' | xargs kill -9
```

### Issue: Port 3000 Already in Use
```bash
# Find and kill the process
lsof -i :3000 | grep node | awk '{print $2}' | xargs kill -9
```

### Issue: Build Fails (Lombok)
```bash
# Clean and rebuild
cd backend
./mvnw clean install -DskipTests
```

---

## 📊 Project Structure

```
SmartShop-AI/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/smartshop/
│   │   ├── auth/                    # Auth & OTP
│   │   ├── user/                    # User management
│   │   ├── product/                 # Product catalog
│   │   ├── cart/                    # Shopping cart
│   │   ├── order/                   # Orders
│   │   ├── ai/                      # AI features
│   │   ├── security/                # JWT & Security
│   │   ├── config/                  # Configuration
│   │   └── common/                  # Utilities
│   ├── pom.xml                      # Maven dependencies
│   └── target/                      # Build output
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── api/                     # API client
│   │   ├── pages/                   # React pages
│   │   ├── components/              # React components
│   │   ├── App.js                   # Main app
│   │   └── index.js                 # Entry point
│   ├── package.json                 # npm dependencies
│   └── build/                       # Production build
│
└── docs/
    ├── README-backend.md
    └── README-frontend.md
```

---

## 🔐 Authentication Flow

1. **Register** → POST `/api/auth/register` → User created
2. **Login** → POST `/api/auth/login` → JWT token returned
3. **Use Token** → Include in `Authorization: Bearer <token>` header
4. **Protected Endpoints** → All `/api/*` routes require valid JWT

---

## 📈 API Response Format

All responses follow this format:

### Success Response (200)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

---

## 🗄️ Database

**Type:** H2 in-memory (for development)  
**Schema:** Auto-created by Hibernate on startup  
**Access:** http://localhost:8080/h2-console

### Tables
- `users` — User accounts
- `products` — Product catalog
- `carts` — Shopping carts
- `cart_items` — Items in carts
- `orders` — Customer orders
- `order_items` — Items in orders
- `otp_tokens` — OTP verification codes

---

## 🎯 Current Status

✅ Backend running and all APIs working  
✅ Frontend running and compiled successfully  
✅ Authentication (JWT) working  
✅ CORS configured for frontend access  

---

## 📚 Next Steps

1. Add sample products to the database
2. Test frontend UI with real API calls
3. Configure SMTP for OTP email delivery
4. Implement frontend pages (home, products, cart, checkout)
5. Add more comprehensive error handling

---

**Happy coding! 🚀**
