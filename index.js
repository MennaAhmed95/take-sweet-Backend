const express = require("express");
const userRoute = require("./routes/user");
const roleRoute = require("./routes/role");
const cafeRoute = require("./routes/cafe");
const categoryRoute =require('./routes/category');
const paymentType = require('./routes/paymentType');
const companyRoute = require('./routes/company');

const orderRoute = require ('./routes/order')
const productRoute = require('./routes/product')
// const branchRoute = require("./routes/branch");

require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.use("/user",userRoute);
app.use("/role",roleRoute);
app.use("/cafe",cafeRoute);
app.use("/category",categoryRoute)
app.use("/payment",paymentType);
app.use("/company",companyRoute)

// app.use("/category", categoryRoute);
// app.use("/product", productRoute);
// app.use("/branch", branchRoute);
// app.use("/paymentType", paymentTypeRoute);
// app.use("/company", companyRoute);
// app.use("/order", orderRoute);


app.use((req, res, next) => {
  res.json({
    "request url": req.url,
    method: req.method,
    "current time": Date.now(),
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    meesage: err.message,
    type: err.type,
    details: err.details,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
