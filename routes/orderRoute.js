const express = require("express");
const { placeOrder, getOrders, orderDetails } = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder)
orderRouter.get("/history", getOrders)
orderRouter.get("/details/:orderId", orderDetails)

module.exports = { orderRouter };
