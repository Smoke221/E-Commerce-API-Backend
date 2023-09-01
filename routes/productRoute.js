const express = require("express");
const {
  getProducts,
  insertSample,
  getProductById,
  getcategories,
} = require("../controllers/product");
const { productListingLimiter } = require("../middlewares/rateLimiter");

const productRouter = express.Router();

productRouter.use(productListingLimiter)

// Get all products
productRouter.get("/", getProducts);

// productRouter.post("/insertMany", insertSample);

// Get a product by ID
productRouter.get("/:id", getProductById);

module.exports = { productRouter };