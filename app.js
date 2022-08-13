const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const uri = process.env.MONGODB_CONNECTION_URI;
const port = process.env.MONGODB_CONNECTION_PORT;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (e) {
    console.error(e, "error while connecting to the db");
  }
};

connect();

app.listen(port || 8001, () => {
  console.log("server started on port 8000");
});
