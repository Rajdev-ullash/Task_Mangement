//Basic Lib import
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./src/routes/api");

//Security Middleware Lib import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Database Lib import
const mongoose = require("mongoose");

//Security Middleware implementation
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body Parser Middleware implementation
app.use(bodyParser.json());

//Request Limiter Middleware implementation
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

//Mongoose Connection
let URI = "mongodb://localhost:27017/task-manager-api";
let OPTION = { autoIndex: true, useNewUrlParser: true };
mongoose.connect(URI, OPTION, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

//Routing implementation
app.use("/api/v1", router);

//undefined route handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

module.exports = app;
