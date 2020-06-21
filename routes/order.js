const express = require("express");
const router = express.Router();

const Order = require("../models/order");

const { orderAuthorization } = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");

require("express-async-errors");
const _ = require("lodash");

//get all orders
router.get("/", async (req, res, next) => {
  const orders = await Order.find()
    .populate("productId")
    .populate("companyId")
    .populate("userId");
  res.send(orders);
});

//add new order by userId
router.post("/addOrder", authenticationmiddleWare, async (req, res, next) => {
  const {
    orderProducts,
    totalPrice,
    companyId,
    comments,
    paymentType,
  } = req.body;
  debugger;
  const status = "Waiting";
  const date = Date.now();
  const userId = req.user.id;
  const order = new Order({
    date,
    status,
    orderProducts,
    totalPrice,
    companyId,
    userId,
    comments,
    paymentType,
  });
  await order.save();
  res.json(order);
});

//edit order by userId
router.patch(
  "/:id",
  authenticationmiddleWare,
  orderAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const {
      date,
      status,
      products,
      company,
      cafe,
      comments,
      paymentType,
    } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {
        date,
        status,
        products,
        company,
        cafe,
        comments,
        paymentType,
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true,
      }
    );
    res.status(200).json({
      message: "order Edit Succssfully",
      order,
    });
  }
);

//delete order
router.delete(
  "/:id",
  authenticationmiddleWare,
  // orderAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  }
);

// get orders by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("userId")
    .populate("companyId")
    .populate("products");
  res.status(200).json(order);
});

module.exports = router;
