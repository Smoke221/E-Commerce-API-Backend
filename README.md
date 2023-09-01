# E-commerce API Documentation

This documentation provides an overview of the API endpoints, models, and authentication methods used in the E-commerce project.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Authentication](#2-authentication)
3. [Models](#3-models)
4. [API Endpoints](#4-api-endpoints)
   - [User](#user-model)
   - [Product](#product-model)
   - [Cart](#cart-model)
   - [Order](#order-model)
5. [Running the Project](#5-running-the-project)

---

## 1. Introduction

This E-commerce project aims to create a RESTful API for an online store. The API allows users to browse products, add them to their cart, place orders, and view their order history.

## 2. Authentication

Authentication in this project is handled using JSON Web Tokens (JWT). Users can register, log in, and obtain a JWT token, which is then used to authenticate API requests. Routes that require authentication are clearly documented below.

## 3. Models

### User Model

- The User model stores user information such as name, email, and a hashed password.

### Product Model

- The Product model represents the products available in the store. It includes fields like title, price, description, category, and availability.

### Cart Model

- The Cart model represents a user's shopping cart. It contains information about the user, including their ID, and an array of products they have added to the cart. Each cart item includes the product's ID and quantity.

### Order Model

- The Order model stores information about user orders. It includes the user's ID, an array of products in the order (each with product ID, quantity, and price), and the total order amount.

## 4. API Endpoints

### User

- `POST /api/users/register`: Register a new user. Requires a name, email, and password in the request body.

- `POST /api/users/login`: Log in a user. Requires email and password in the request body. Returns a JWT token upon successful login.

### Product

- `GET /api/products/`: Retrieve a list of all products. You can optionally provide a `category` query parameter to filter products by category.

- `GET /api/products/:id`: Retrieve details of a specific product by its ID.

### Cart

- `GET /api/cart`: Get the user's shopping cart. Requires authentication.

- `POST /api/cart/add/:productId`: Add a product to the cart. Requires authentication and the product ID in the route parameter.

- `PUT /api/cart/update/:productId`: Update the quantity of a cart item. Requires authentication and the product ID in the route parameter. The new quantity should be provided in the request body.

- `DELETE /api/cart/delete/:productId`: Remove a product from the cart. Requires authentication and the product ID in the route parameter.

### Order

- `POST /api/orders/place`: Place an order using the products in the user's cart. Requires authentication. The order will include the products from the cart, and the total order amount will be calculated.

- `GET /api/orders/history`: Retrieve the order history for the authenticated user. Requires authentication.

- `GET /api/orders/details/:orderId`: Retrieve details of a specific order by its ID. Requires authentication.

## 5. Running the Project

To run the project, follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies using `npm install`.

3. Set up your database connection (MongoDB) and configure it in the project.

4. Start the server using `npm run start`.

5. You can now make API requests to the specified endpoints, ensuring proper authentication where required.

---

This README provides an overview of the project's authentication, models, and API endpoints. For more detailed information on using each endpoint and their expected inputs and outputs.