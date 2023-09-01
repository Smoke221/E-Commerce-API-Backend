const express = require("express");
const { getCart, addToCart, updateCartItemQuantity, removeCartItem } = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.get("/", getCart);
cartRouter.post("/add/:productId", addToCart)
cartRouter.put("/update/:productId", updateCartItemQuantity)
cartRouter.delete("/delete/:productId", removeCartItem)

module.exports = { cartRouter };
