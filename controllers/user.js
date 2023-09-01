const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

// Register a new user
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with a unique email and hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registration successful.
 *       400:
 *         description: User with the same email already exists.
 *       500:
 *         description: Internal server error.
 */
async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the user's password before saving it to the database.
    const hash = await bcrypt.hash(password, 10); // Use a stronger salt factor.

    // Check if a user with the given email already exists in the database.
    const isExisting = await userModel.findOne({ email });

    if (isExisting) {
      // User with the same email already exists, return an error.
      res.status(400).json({ message: "User already exists, please login" });
    } else {
      // Create a new user document with the hashed password.
      const newUser = new userModel({ name, email, password: hash });
      await newUser.save();

      // User registration successful.
      res.status(201).json({ message: "New user registered" });
    }
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// Login a user
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user.
 *     description: Authenticate a user by comparing their provided password with the hashed password in the database. Returns a JWT token upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token.
 *       401:
 *         description: Wrong password or user credentials.
 *       500:
 *         description: Internal server error.
 */
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by their email in the database.
    const user = await userModel.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password in the database.
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        // Create a JWT token for the user's successful login.
        const token = jwt.sign({ userID: user._id }, "secret", {
          expiresIn: "1h", // Token expiration time (e.g., 1 hour)
        });

        // Successful login, return a token.
        res.json({ message: "Logged in", token: token });
      } else {
        // Password does not match.
        res.status(401).json({ message: "Wrong password" });
      }
    } else {
      // User with the provided email does not exist.
      res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

module.exports = { userRegister, userLogin };