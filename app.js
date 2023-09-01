const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();

const app = express();

app.get("/", async (req,res) => {
    res.send('working')
})

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
