const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to User Backend");
});

app.use("/api/user", UserRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
