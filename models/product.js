const mongoose = require("mongoose");
const _ = require("lodash");
const { number } = require("@hapi/joi");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      // min: 5
    },
    minPieces: {
      type: Number,
      required: true,
    },
    availableAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    onSale: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, [
          "id",
          "name",
          "imageSrc",
          "price",
          "minPieces",
          "availableAmount",
          "userId",
          "categoryId",
          "amount",
          "onSale",
        ]);
      },
    },
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
