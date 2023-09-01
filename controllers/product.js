const { productModel } = require("../models/productModel");

// Get a list of products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products.
 *     description: Get a list of all products or filter by category.
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Optional category filter.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
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
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// Get a product by ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     description: Get a product's details by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
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
    // Handle internal server error.
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