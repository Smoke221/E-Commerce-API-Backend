const express = require("express");
const { getProducts,insertSample } = require("../controllers/product");

const productRouter = express.Router();

productRouter.get("/all", getProducts)
// productRouter.post("/insertMany", insertSample)

module.exports = { productRouter };
