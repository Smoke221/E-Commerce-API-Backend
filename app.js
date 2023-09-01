const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { cartRouter } = require("./routes/cartRoute");
const { authenticate } = require("./middlewares/authentication");

require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("working");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/products", productRouter);
app.use("/cart", cartRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
