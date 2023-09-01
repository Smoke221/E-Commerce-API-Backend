const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
} = require("../controllers/cart");
const { cartOperationsLimiter } = require("../middlewares/rateLimiter");

const cartRouter = express.Router();

// Get the user's cart
cartRouter.get("/", getCart);

cartRouter.use(cartOperationsLimiter)

// Add a product to the cart
cartRouter.post("/add/:productId", addToCart);

// Update the quantity of a product in the cart
cartRouter.put("/update/:productId", updateCartItemQuantity);

// Remove a product from the cart
cartRouter.delete("/delete/:productId", removeCartItem);

module.exports = { cartRouter };
