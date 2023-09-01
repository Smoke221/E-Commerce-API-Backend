const express = require("express");
const { getProducts,insertSample, getProductById } = require("../controllers/product");

const productRouter = express.Router();

productRouter.get("/all", getProducts)
// productRouter.post("/insertMany", insertSample)
productRouter.get("/:id", getProductById)

module.exports = { productRouter };
