# 🌟 E-commerce API

Welcome to the E-commerce API , your gateway to a world of seamless online shopping. This comprehensive guide will introduce you to the intricacies of our powerful API, models, and the art of authentication.

🚀 **Backend Deployment**: Our backend is securely deployed and accessible at [Backend Deployment](https://e-commerce-api-with-node-js.onrender.com). Take a journey into the heart of our E-commerce system!

📘 **API Documentation**: Dive deeper into the API functionalities by exploring our detailed [Swagger Documentation](https://e-commerce-api-with-node-js.onrender.com/api-docs/).

**Rate Limiting**: This API has rate limiting implemented to prevent abuse and ensure server stability. Please see the [Rate Limiting Section](#7-rate-limiting) for details on rate limits.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Authentication](#2-authentication)
3. [Models](#3-models)
4. [API Endpoints](#4-api-endpoints)
   - [User](#user-model)
   - [Product](#product-model)
   - [Cart](#cart-model)
   - [Order](#order-model)
5. [API Documentation](#5-api-documentation)
6. [Running the Project](#6-running-the-project)

---

## 1. Introduction

Discover the magic of our E-commerce project, where innovation meets convenience. Uncover the power of our RESTful API, enabling users to effortlessly browse products, manage their shopping cart, place orders, and track their order history.

## 2. Authentication

🔐 Authentication is at the heart of our E-commerce experience. With JSON Web Tokens (JWT), users can register, log in, and gain access to our API securely. Explore the documented routes below to harness the full potential of our platform.

## 3. Models

### User Model

- The User model holds valuable user data, including name, email, and a securely hashed password.

### Product Model

- The Product model brings our store to life, featuring essential product details such as title, price, description, category, and availability.

### Cart Model

- The Cart model represents a user's shopping companion. It stores user information and a collection of products, each with a product ID and quantity.

### Order Model

- The Order model records user orders with precision. It captures user ID, a product array (including product ID, quantity, and price), and the total order amount.

## 4. API Endpoints

### User

- `POST /api/users/register`: 📝 Register a new user. Simply provide a name, email, and password in the request body.

- `POST /api/users/login`: 🚪 Log in a user. Submit your email and password in the request body and receive a JWT token upon successful login.

### Product

- `GET /api/products/`: 🛍️ Retrieve a curated list of all products. Filter by category using the optional `category` query parameter.

- `GET /api/products/:id`: 📦 Discover detailed information about a specific product by its ID.

### Cart

- `GET /api/cart`: 🛒 Access your shopping cart. Authentication is required.

- `POST /api/cart/add/:productId`: ➕ Add a product to your cart. Authenticate and provide the product ID in the route parameter.

- `PUT /api/cart/update/:productId`: 🔄 Update the quantity of a cart item. Ensure authentication and include the product ID in the route parameter. Specify the new quantity in the request body.

- `DELETE /api/cart/delete/:productId`: 🗑️ Remove a product from your cart. Authentication and the product ID in the route parameter are required.

### Order

- `POST /api/orders/place`: 🛒 Place an order using the products in your cart. Authentication is essential. The order will include cart products, with the total order amount calculated automatically.

- `GET /api/orders/history`: 🕒 Retrieve your order history. Stay authenticated for access.

- `GET /api/orders/details/:orderId`: 📜 Retrieve detailed information about a specific order by its ID. Authentication required.

## 5. API Documentation

For an immersive API experience, consult our comprehensive [Swagger Documentation](https://e-commerce-api-with-node-js.onrender.com/api-docs/).

## 6. Running the Project

Ready to embark on your E-commerce journey? Follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies using `npm install`.

3. Configure your database connection (MongoDB) in the project.

4. Start the server with a mighty `npm run start`.

5. Explore the API endpoints and ensure proper authentication where needed.

## 7. Rate Limiting

To maintain server stability and prevent abuse of the API, rate limiting has been implemented for various API endpoints. Rate limiting restricts the number of requests that can be made to certain endpoints within a specified time frame. This helps ensure fair usage of the API resources and prevents excessive requests from a single source.

### Login and Registration

- **Endpoint**: `/api/users/register`, `/api/users/login`
- **Rate Limit**: Max 5 requests per IP address per hour
- **Message**: If you exceed the rate limit for login or registration attempts, you will receive a response with the message "Too many login/register attempts from this IP. Please try again later."

### Product Listing

- **Endpoint**: `/api/products/`
- **Rate Limit**: Max 25 requests per IP address per hour
- **Message**: If you exceed the rate limit for product listing requests, you will receive a response with the message "Rate limit exceeded for product listing. Please wait and try again later."

### Cart Operations

- **Endpoint**: `/api/cart/add/:productId`, `/api/cart/update/:productId`, `/api/cart/delete/:productId`
- **Rate Limit**: Max 15 requests per IP address per hour
- **Message**: If you exceed the rate limit for cart operations, you will receive a response with the message "Rate limit exceeded for cart operations. Please try again later."

### Order Placement

- **Endpoint**: `/api/orders/place`
- **Rate Limit**: Max 5 orders per IP address per hour
- **Message**: If you exceed the rate limit for order placement, you will receive a response with the message "Rate limit exceeded for order placement. Please try again later."

Please be mindful of the rate limits and ensure that your application adheres to them to avoid being temporarily restricted from making further requests. If you encounter rate-limiting responses, wait for the specified time frame before making additional requests.

---

This README serves as your gateway to a world of e-commerce possibilities. Dive into the API documentation and harness the power of our E-commerce platform.