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

async function getProductById(req,res){
    try{
        const id = req.params.id

        const isProductAvailable = await productModel.findOne({_id:id})

        if(isProductAvailable){
            res.send(isProductAvailable)
        }else{
            res.send({message:"No product found"})
        }
    }
    catch (err) {
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

module.exports = { getProducts, getProductById };
