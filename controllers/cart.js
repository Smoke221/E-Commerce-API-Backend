const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");

// Get user's cart
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve User's Shopping Cart
 *     description: Get the user's shopping cart with detailed product information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's shopping cart.
 *       404:
 *         description: The user's cart was not found.
 *       500:
 *         description: Internal server error while retrieving the cart.
 */
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
/**
 * @swagger
 * /cart/add/{productId}:
 *   post:
 *     summary: Add Product to Cart
 *     description: Add a product to the user's shopping cart. If the cart doesn't exist, a new cart will be created.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to add to the cart.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Product added to the cart successfully.
 *       200:
 *         description: Product is already in the cart.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error while adding the product to the cart.
 */
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
/**
 * @swagger
 * /cart/update/{productId}:
 *   put:
 *     summary: Update Cart Item Quantity
 *     description: Update the quantity of a specific product in the user's shopping cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product in the cart to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: quantity
 *         required: true
 *         description: The new quantity of the product in the cart.
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *     responses:
 *       200:
 *         description: Quantity updated successfully.
 *       404:
 *         description: Cart not found or product not found in the cart.
 *       500:
 *         description: Internal server error while updating cart item quantity.
 */
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
    /**
 * @swagger
 * /cart/delete/{productId}:
 *   delete:
 *     summary: Remove Item from Cart
 *     description: Remove a specific product from the user's shopping cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart successfully.
 *       404:
 *         description: Cart not found or product not found in the cart.
 *       500:
 *         description: Internal server error while removing the item from the cart.
 */
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