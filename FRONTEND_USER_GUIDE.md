# 🚀 How to Use Your Enhanced SmartShop AI Frontend

## Getting Started

### 1. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd /Users/naveen/Desktop/SmartShop-AI/backend
java -jar target/smartshop-backend-0.0.1-SNAPSHOT.jar
# Runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd /Users/naveen/Desktop/SmartShop-AI/frontend
npm start
# Runs on http://localhost:3000
```

### 2. Open Your Browser
Navigate to: `http://localhost:3000`

---

## 📖 Feature Guide

### Navigation Bar
- **Logo**: Clickable link to home page
- **Menu Links**: Home, Shop, AI Stylist
- **Cart Icon**: Shows item count, click to view cart
- **User Dropdown**: After login, shows profile, orders, wishlist
- **Mobile Menu**: Hamburger icon on small screens

### Home Page
- Hero section with AI shopping benefits
- Featured products section
- Call-to-action buttons
- Statistics about SmartShop

### Products Page (`/products`)
1. **Search Bar** (top)
   - Type product name or description
   - Real-time filtering

2. **Filters (left sidebar)**
   - **Sort By**: Newest, Popular, Price Low-High, Price High-Low
   - **Price Range**: Adjust min/max with inputs
   - **Categories**: Select Electronics, Accessories, Home, Fashion
   - **Apply Filters**: Click button to filter

3. **Product Grid**
   - Click "Add to Cart" on any product
   - Cart badge updates with count
   - Products show rating and price

### Shopping Cart (`/cart`)
1. **Cart Items**
   - See all items with prices
   - Adjust quantity with +/- buttons
   - Remove items with ✕ button

2. **Order Summary (right sidebar)**
   - Enter coupon code (try: SAVE10, SAVE20, WELCOME)
   - See subtotal, discount, tax, total
   - See free shipping & security info

3. **Checkout**
   - Click "Proceed to Checkout" button
   - Fills order for processing

### AI Stylist (Chatbot) (`/chatbot`)
1. **Quick Actions** (first message)
   - Click buttons for quick searches
   - Or type your own question

2. **Chat Interface**
   - Type your question/request
   - Press Enter or click send button
   - AI responds with suggestions
   - Click suggestions to refine

3. **Sample Prompts**
   - "Show me electronics"
   - "Find best sellers"
   - "What's on sale?"
   - "Help with my order"

### User Profile (`/profile`) - After Login
1. **Profile Information**
   - View: Username, Email, Phone
   - Click "Edit" to modify
   - Save changes

2. **Statistics**
   - Total Orders
   - Reviews Written
   - Wishlist Items
   - Total Spent

3. **Recent Orders**
   - See order ID, status, amount
   - Click to expand for details

### My Orders (`/orders`) - After Login
1. **Order History**
   - View all your orders
   - See order status (Delivered, In Transit, Pending)

2. **Order Details**
   - Click "View Details" to expand
   - See items, tracking number
   - View shipping address
   - See payment method
   - Check estimated delivery

---

## 🎨 Design & Styling

### Colors You'll See
- **Indigo Blue** (#6366f1) - Main buttons, links
- **Pink** (#ec4899) - Hover effects, badges
- **Green** - Success messages, delivered orders
- **Red** - Error messages, removed items
- **Amber** - Warnings, discounts

### Responsive Features
- **Mobile**: Hamburger menu, single column layout
- **Tablet**: Two-column grid, optimized spacing
- **Desktop**: Full sidebar filters, multi-column grid

### Animations
- Hover on cards → they lift up
- Click buttons → smooth color transition
- Messages in chat → slide in smoothly
- Loading spinner → rotating animation

---

## 🔐 User Authentication

### Login Flow
1. Go to Login page (or click "Sign In")
2. Enter email and password
3. Click "Sign In" button
4. Redirected to Home page
5. Cart, Profile, Orders now available

### Register
1. Click "Get Started" or "Sign Up"
2. Fill in: Username, Email, Password
3. Click "Create Account"
4. Auto-login and redirected to Home

### Sample Test Account
```
Username: sampleuser
Password: SamplePass@123
Email: sample@smartshop.com
```

### Logout
1. Click user avatar (top right)
2. Select "Logout"
3. Redirected to login page

---

## 🛒 Shopping Workflow

### Step 1: Browse Products
```
Home → Click "Shop" or "Explore Products"
```

### Step 2: Filter & Search
```
Use sidebar filters or search bar
Type product name (e.g., "Headphones")
Adjust price range, select category
Click Apply Filters
```

### Step 3: Add to Cart
```
Click "Add to Cart" on product
Cart badge updates
Continue shopping or go to cart
```

### Step 4: Review Cart
```
Go to Cart page
See all items, prices, quantity
```

### Step 5: Apply Coupon (Optional)
```
Enter coupon code: SAVE10 (10% off)
Click Apply button
See discount in summary
```

### Step 6: Checkout
```
Click "Proceed to Checkout"
(In full implementation, would show payment form)
```

---

## 💬 Using the AI Stylist

### Feature: Smart Recommendations
The AI Stylist can help you:
- Find products by description
- Get recommendations
- Answer questions about products
- Track your orders

### Example Conversations

**Q: "Show me electronics"**
- A: Shows list of electronic products with quick action buttons

**Q: "Find something under $50"**
- A: Filters products by price
- Shows suggestions to refine search

**Q: "What's trending?"**
- A: Shows popular products
- Provides links to product details

### Chat Features
- **Quick Actions**: Buttons for fast navigation
- **Suggestions**: Click to refine results
- **Typing Indicator**: Shows when AI is "thinking"
- **Timestamps**: See when each message was sent

---

## 📊 Viewing Your Orders

### After Making Purchases
1. Click user avatar (top right)
2. Select "My Orders"
3. See all your orders

### Order Information Available
- Order ID (e.g., #ORD-001)
- Order date
- Status (Delivered, In Transit, Pending)
- Items ordered
- Total amount
- Tracking number

### Expand Order Details
- Click "View Details" button
- See shipping address
- See payment method
- Check estimated delivery date

---

## ⚙️ Settings & Account

### Profile Management
1. Go to "My Profile" (user dropdown)
2. View your information
3. Click "Edit" to modify
4. Update Email or Phone
5. Click "Save Changes"

### Wishlist (Coming Soon)
- Click heart icon on products
- Access from user dropdown menu

### Settings (Coming Soon)
- Notification preferences
- Shipping defaults
- Payment methods

---

## 🎁 Coupon Codes

Test coupons (in your Cart):
- **SAVE10** → 10% discount
- **SAVE20** → 20% discount  
- **WELCOME** → 15% discount

How to use:
1. Go to Cart
2. Enter coupon code
3. Click "Apply"
4. See discount in Order Summary

---

## 🐛 Troubleshooting

### Frontend Not Loading
```bash
# Kill old processes
pkill -f 'npm start'

# Clear cache
rm -rf node_modules/.cache

# Restart
npm start
```

### Cart Not Updating
```bash
# Check localStorage in browser console
localStorage.getItem('cart')
localStorage.getItem('cartCount')

# Clear cache if needed
localStorage.clear()
```

### Login Issues
```bash
# Make sure backend is running
# Check: http://localhost:8080/actuator/health
# Should return: {"status":"UP"}
```

### Styles Not Loading
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Or clear browser cache
```

---

## 📱 Mobile Testing

### Using DevTools
1. Open DevTools (F12 or Right-click → Inspect)
2. Click device toggle (top-left)
3. Select device (iPhone, iPad, etc.)
4. Test all pages and interactions

### Responsive Sizes
- **iPhone (375px)**: Small mobile view
- **iPad (768px)**: Tablet view
- **Desktop (1920px)**: Full desktop view

### Mobile Features
- Hamburger menu works great
- Touch-friendly buttons
- Proper spacing for touch
- Images optimize for speed

---

## 🔄 Updating Frontend

### After Changes
```bash
# No need to restart if using hot reload
# Just refresh browser
```

### After Updating Dependencies
```bash
npm install
npm start
```

### Full Clean Build
```bash
npm run build
# Creates optimized production build in 'build/' folder
```

---

## 📚 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         (Navigation bar)
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         (Footer)
│   │   ├── Footer.css
│   │   ├── ProductCard.jsx    (Product display)
│   │   └── ProductCard.css
│   │
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProductsPage.js    (NEW)
│   │   ├── ProductsPage.css
│   │   ├── CartPage.js        (ENHANCED)
│   │   ├── CartPage.css
│   │   ├── ChatbotPage.js     (ENHANCED)
│   │   ├── ChatbotPage.css
│   │   ├── UserProfilePage.js (NEW)
│   │   ├── UserProfilePage.css
│   │   ├── OrdersPage.js      (NEW)
│   │   ├── OrdersPage.css
│   │   ├── LoginPage.js
│   │   └── LoginPage.css
│   │
│   ├── styles/
│   │   └── global.css         (NEW - Design System)
│   │
│   ├── api/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── ai.js
│   │   └── config.js
│   │
│   ├── App.js                 (UPDATED - New routes)
│   └── index.js               (UPDATED - Global styles)
│
└── package.json
```

---

## 🚀 Next Features to Implement

### High Priority
- [ ] Connect ProductsPage to `/api/products`
- [ ] Connect ChatbotPage to `/api/ai/chat`
- [ ] Implement product details page
- [ ] Add checkout form with payment

### Medium Priority
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Order confirmation emails
- [ ] Advanced search filters

### Nice to Have
- [ ] Dark mode toggle
- [ ] Product comparison
- [ ] Social sharing
- [ ] User reviews on products

---

## 💡 Pro Tips

1. **Save Cart**: Items persist in localStorage
2. **Remember Login**: Token stored automatically
3. **Mobile First**: Always test on mobile!
4. **Use DevTools**: Chrome DevTools Console for debugging
5. **Check Logs**: Browser console for errors
6. **Test Responsive**: Use DevTools device toggle
7. **Clear Cache**: If styles don't update, hard refresh
8. **API Testing**: Use curl to test backend endpoints

---

## ❓ Common Questions

**Q: How do I add a real product image?**
A: Update ProductCard.jsx to use product.imageUrl instead of placeholder

**Q: Can I change the colors?**
A: Yes! Edit CSS variables in global.css

**Q: How do I make the AI actually smart?**
A: Connect ChatbotPage to real AI API (like OpenAI)

**Q: Is it mobile-ready?**
A: Yes! All pages are fully responsive

**Q: Can I add more pages?**
A: Yes! Follow the same pattern: Create .js and .css files, add route to App.js

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12)
2. Verify both servers are running
3. Check logs: `/tmp/smartshop-backend.log`
4. Clear cache and restart

---

**Happy Shopping! 🛍️✨**

Version: 1.0 - Enhanced Frontend
Last Updated: February 27, 2026
