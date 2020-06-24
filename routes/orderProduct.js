const express = require("express");
const router = express.Router();
const OrderProduct = require("../models/orderProduct");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
const _ = require("lodash");
const multer = require("multer");

// get All orderProducts
router.get("/", async (req, res, next) => {
  const orderProducts = await OrderProduct.find().populate("categoryId");

  res.send(orderProducts);
});

router.post(
  "/addOrderProduct",
  async (req, res, next) => {
    const {
      name,
      imageSrc,
      price,
      categoryId,
      amount,
      totalPrice,
      productId,
    } = req.body;
    const orderProduct = new OrderProduct({
      productId,
      name,
      imageSrc,
      price,
      amount,
      totalPrice,
      categoryId,
      amount,
    });
    await orderProduct.save();
    res.json(orderProduct);
  }
);

module.exports = router;
