const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { productAuthorization } = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
const _ = require("lodash");

router.get("/", async (req, res, next) => {
  const products = await Product.find()
    .populate("categoryId")
    .populate("userId");
  res.send(products);
});

router.post("/addProduct", authenticationmiddleWare, async (req, res, next) => {
  const {
    name,
    imageSrc,
    price,
    minPieces,
    availableAmount,
    categoryId,
  } = req.body;
  const userId = req.user.id;
  const product = new Product({
    name,
    imageSrc,
    price,
    minPieces,
    availableAmount,
    userId,
    categoryId,
  });
  await product.save();
  res.json(product);
});

router.patch(
  "/:id",
  authenticationmiddleWare,
  productAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      imageSrc,
      price,
      minPieces,
      availableAmount,
      userId,
      categoryId,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        imageSrc,
        price,
        minPieces,
        availableAmount,
        userId,
        categoryId,
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true,
      }
    );
    res.status(200).json({
      message: "product Edit Succssfully",
      product,
    });
  }
);

router.delete(
  "/:id",
  authenticationmiddleWare,
  productAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  }
);

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categoryId").populate("userId");
  res.status(200).json(product);
});

module.exports = router;
