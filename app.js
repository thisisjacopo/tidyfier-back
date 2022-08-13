//* IMPORTS:
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRouter = require("./routes/authRouter");

//* SETUPS
require("dotenv").config();
const app = express();

//* VARIABLES
const uri = process.env.MONGODB_CONNECTION_URI;
const port = process.env.MONGODB_CONNECTION_PORT;

// DB CONNECTION
const connect = async () => {
  try {
    await mongoose.connect(uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (e) {
    console.error(e, "error while connecting to the db");
  }
};

connect();

// SESSION MIDDLEWARE
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: uri,
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 30 * 3, // 3 months
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTER MIDDLEWARE
app.use("/auth", authRouter);

app.listen(port || 8001, () => {
  console.log("server started correctly on port: ", port);
});

module.exports = app;
