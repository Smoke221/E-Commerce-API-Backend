const { cartModel } = require("../models/cartModel");
const { orderModel } = require("../models/orderModel");

// Place an order
/**
 * @swagger
 * /orders/place:
 *   post:
 *     summary: Place an Order
 *     description: Place an order using the products in the user's shopping cart. The cart will be cleared after placing the order.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: The user's cart is empty.
 *       500:
 *         description: Internal server error while placing the order.
 */
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
/**
 * @swagger
 * /orders/history:
 *   get:
 *     summary: Get User's Order History
 *     description: Retrieve the order history of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's order history.
 *       500:
 *         description: Internal server error while retrieving the order history.
 */
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
/**
 * @swagger
 * /orders/details/{orderId}:
 *   get:
 *     summary: Get Order Details by ID
 *     description: Retrieve details of a specific order by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to retrieve details.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the order details.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error while retrieving order details.
 */
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