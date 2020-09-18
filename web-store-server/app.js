const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const indexAPIRoutes = require("./components/index/indexAPI");
const productRoutes = require("./components/product/productsAPI");
const orderRoutes = require("./components/orders/ordersAPI");
const emailRoutes = require("./components/email/emailAPI");
const userRoutes = require("./components/users/usersAPI");
const aboutRoutes = require("./components/about/aboutApi");
const wishRoutes = require("./components/wishlist/wishlistAPI");
const recommendedRouters = require("./components/recommended/recommendedAPI");

mongoose.connect("mongodb://127.0.0.1:27017/PRODAVNICABP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/sendmail", emailRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/wishlist", wishRoutes);
app.use("/recommended",recommendedRouters);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
