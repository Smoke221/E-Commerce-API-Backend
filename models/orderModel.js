const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model for the user who placed the order
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model for the ordered product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // We can also include additional fields like shipping address, payment information, etc.
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = { orderModel };
