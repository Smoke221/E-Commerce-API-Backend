const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { cartRouter } = require("./routes/cartRoute");
const { authenticate } = require("./middlewares/authentication");
const { orderRouter } = require("./routes/orderRoute");
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

require("dotenv").config();

const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to the Ecommerce API with Node.js</h1>
        <p>This API allows you to manage users, products, shopping carts, and orders.</p>
  `);
});


app.use("/user", userRouter);
app.use("/products", productRouter);
app.use(authenticate);
app.use("/cart", cartRouter)
app.use("/order",orderRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
