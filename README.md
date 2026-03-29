

```
# 🛍 ShopEasy - Full Stack E-Commerce Web Application

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Node.js](https://img.shields.io/badge/Node.js-v20-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Cloud-green)

##  Project Overview
ShopEasy is an industry-oriented full stack e-commerce web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project was developed as part of the **RISE Internship - Full Stack Development Program**.

---

## Objective
To build a robust, scalable full stack e-commerce platform that supports:
- Product browsing and searching
- Cart management and order processing
- Admin product management
- User authentication and authorization

---

##  Developer
- **Name:** Girija Palani
- **Program:** RISE Internship - Full Stack Development (MERN)
- **Project:** Industry-Oriented Full Stack E-Commerce Web Application

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **MongoDB** | Database (Cloud - Railway) |
| **Express.js** | Backend REST API Framework |
| **React.js** | Frontend UI Library |
| **Node.js** | Backend Runtime Environment |
| **JWT** | Authentication & Authorization |
| **Axios** | HTTP Client |
| **React Router** | Frontend Routing |
| **Git & GitHub** | Version Control |

---

##  Features

###  User Features
- ✅ User Registration with validation (email format, password strength)
- ✅ User Login with JWT authentication
- ✅ Browse and search products
- ✅ Filter products by category
- ✅ Add products to cart
- ✅ Update cart quantity
- ✅ Place orders with Cash on Delivery / Online Payment
- ✅ View order history and status
- ✅ Like products
- ✅ Write reviews and ratings for products

### 🛠 Admin Features
-  Secure admin login
-  Upload/Add new products with emoji icons
-  View all products with stats
-  Delete products
-  View all customer orders (notifications)
-  Update order status (Pending → Processing → Shipped → Delivered)
-  Dashboard with stats (total products, orders, pending, delivered)

---

##  REST API Endpoints

### Users
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Add product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| POST | `/api/products/:id/like` | Like/Unlike product |
| POST | `/api/products/:id/review` | Add review & rating |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place new order |
| GET | `/api/orders/my` | Get user orders |
| GET | `/api/orders/all` | Get all orders (Admin) |
| PUT | `/api/orders/:id/status` | Update order status (Admin) |

---

##  Project Structure
```
ecommerce-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT Authentication
│   ├── models/
│   │   ├── User.js          # User Schema
│   │   ├── Product.js       # Product Schema
│   │   └── Order.js         # Order Schema
│   ├── routes/
│   │   ├── userRoutes.js    # User API Routes
│   │   ├── productRoutes.js # Product API Routes
│   │   └── orderRoutes.js   # Order API Routes
│   ├── .env                 # Environment Variables
│   ├── server.js            # Express Server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx   # Navigation Bar
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login Page
│   │   │   ├── Register.jsx     # Register Page
│   │   │   ├── Home.jsx         # Product Listing
│   │   │   ├── Cart.jsx         # Shopping Cart
│   │   │   ├── Orders.jsx       # Order History
│   │   │   ├── ProductDetail.jsx # Product Details
│   │   │   └── AdminDashboard.jsx # Admin Panel
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v20+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/spgirija2006/ecommerce-app.git
cd ecommerce-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open Browser
```
http://localhost:5173
```

---

## 🔐 Default Credentials

### Admin Login
- **Email:** admin@gmail.com
- **Password:** Admin@123

---

## 📸 Screenshots

### 🏠 Home Page (User)
- Product grid with search and category filters

### 🛒 Cart Page
- Cart items with quantity control and payment options

### 📦 Orders Page
- Order history with status tracking

### 🛠 Admin Dashboard
- Product management and order notifications

---

## 🎓 Learning Outcomes
- Hands-on experience with full stack MERN development
- Understanding of RESTful API design
- JWT-based authentication and authorization
- MongoDB database design and queries
- React.js component-based architecture
- Git version control and GitHub collaboration

---

## 📝 License
This project is developed for educational purposes as part of the RISE Internship Program.

---

⭐ **If you found this project helpful, please give it a star on GitHub!**
```

## Now push it:
```powershell
git add README.md
git commit -m "docs: add project README"
git push origin main
```

