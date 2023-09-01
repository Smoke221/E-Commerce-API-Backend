const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Object,
    rate: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
});

const productModel = new mongoose.model("product", productSchema);

module.exports = { productModel };
