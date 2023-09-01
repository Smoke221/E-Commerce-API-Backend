const { cartModel } = require("../models/cartModel");
const { orderModel } = require("../models/orderModel");

// Place an order
async function placeOrder(req, res) {
  try {
    const userId = req.body.userID; // Get the user ID from the authenticated user

    // Retrieve the user's cart
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate the total price of the order
    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // Create an order from the cart data
    const order = new orderModel({
      user: userId,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalAmount, // Store the total price in the order
    });

    await order.save();

    // Clear the user's cart after placing the order
    await cartModel.deleteOne({ user: userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get a user's order history
async function getOrders(req, res) {
  try {
    const userId = req.body.userID;

    // Retrieve the user's order history
    const orders = await orderModel
      .find({ user: userId })
      .populate("products.product");

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get details of a specific order by ID
async function orderDetails(req, res) {
  try {
    const orderId = req.params.orderId;

    // Retrieve the order by its ID
    const order = await orderModel
      .findById(orderId)
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { placeOrder, getOrders, orderDetails };