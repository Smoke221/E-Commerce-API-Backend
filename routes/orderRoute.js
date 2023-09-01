const express = require("express");
const { placeOrder, getOrders, orderDetails } = require("../controllers/order");

const orderRouter = express.Router();

// Place a new order
orderRouter.post("/place", placeOrder);

// Get the order history for the authenticated user
orderRouter.get("/history", getOrders);

// Get the details of a specific order by its ID
orderRouter.get("/details/:orderId", orderDetails);

module.exports = { orderRouter };
