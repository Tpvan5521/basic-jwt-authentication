const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const cors = require("cors");
const unless = require("express-unless");
const auth = require("./helpers/jwt.js");
const routes = require("./routes/authRoutes");
const errors = require("./helpers/errorHandler.js");
require("dotenv").config();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/users/:id", methods: ["GET"] },
//       { url: "/users/login", methods: ["POST"] },
//       { url: "/users/register", methods: ["POST"] },
//     ],
//   })
// );

app.use("/api", routes);
app.use(errors.errorHandler);

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.listen(3003);
