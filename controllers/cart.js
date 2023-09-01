const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");

// Get user's cart
async function getCart(req, res) {
  try {
    const userId = req.body.userID; // Get the user ID from the auth middleware

    // Find the user's cart and populate product details
    const userCart = await cartModel
      .findOne({ user: userId })
      .populate("products.product", "title price");

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart: userCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Add a product to the cart
async function addToCart(req, res) {
  try {
    const userId = req.body.userID; // Get the user ID from the auth middleware
    const productId = req.params.productId; // Get the product ID from the route parameter

    // Find the user's cart
    let userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      // If the cart doesn't exist, create a new one
      userCart = new cartModel({
        user: userId,
        products: [{ product: productId, quantity: 1 }], // Add product with quantity 1
      });

      await userCart.save();

      res.status(201).json({ message: "Product added to cart successfully" });
    } else {
      // Check if the product is already in the cart
      const productIndex = userCart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex !== -1) {
        res.status(200).json({ message: "Product is already in cart" });
      } else {
        // Check if the product with the given ID exists
        const existingProduct = await productModel.findById(productId);

        if (!existingProduct) {
          return res.status(404).json({ message: "Product not found" });
        }

        userCart.products.push({ product: productId, quantity: 1 });
        await userCart.save();
        res.status(201).json({ message: "Product added to cart successfully" });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// Update the quantity of a cart item
async function updateCartItemQuantity(req, res) {
  try {
    const userId = req.body.userID; // Get the user ID from the auth middleware
    const productId = req.params.productId; // Get the product ID from the route parameter
    const newQuantity = req.body.quantity; // Get the new quantity from the request body

    // Find the user's cart
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product index in the cart
    const productIndex = userCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity
    userCart.products[productIndex].quantity = newQuantity;

    await userCart.save();

    res
      .status(200)
      .json({ message: "Quantity updated successfully", cart: userCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Remove an item from the cart
async function removeCartItem(req, res) {
  try {
    const userId = req.body.userID; // Get the user ID from the auth middleware
    const productId = req.params.productId; // Get the product ID from the route parameter

    // Find the user's cart
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    userCart.products = userCart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await userCart.save();

    res.status(200).json({ message: "Item removed from cart", cart: userCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { getCart, addToCart, updateCartItemQuantity, removeCartItem };