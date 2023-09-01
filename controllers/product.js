const { productModel } = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

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

module.exports = { getProducts };
