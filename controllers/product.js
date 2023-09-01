const { productModel } = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const { category } = req.query;

    // Check if a category parameter is provided
    if (category) {
      const products = await productModel.find({ category: category });
      res.send(products);
    } else {
      const products = await productModel.find();
      res.send(products);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const id = req.params.id;

    const isProductAvailable = await productModel.findOne({ _id: id });

    if (isProductAvailable) {
      res.send(isProductAvailable);
    } else {
      res.send({ message: "No product found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// async function getcategories(req, res) {
//   try {
//     // Use distinct to fetch unique category values from the Products collection
//     const categories = await productModel.distinct("category");

//     res.status(200).json({ categories });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// }

// async function insertSample(req, res) {
//   try {
//     const productsToInsert = req.body;
//     // Use the insertMany method to insert the array of products
//     const insertedProducts = await productModel.insertMany(productsToInsert);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: err.message });
//   }
// }

module.exports = { getProducts, getProductById };
