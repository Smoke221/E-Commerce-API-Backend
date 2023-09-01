const express = require("express");
const { getProducts,insertSample, getProductById, getcategories } = require("../controllers/product");

const productRouter = express.Router();

productRouter.get("/", getProducts)
// productRouter.post("/insertMany", insertSample)
productRouter.get("/:id", getProductById)

module.exports = { productRouter };
