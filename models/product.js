const mongoose = require("mongoose");
const _ = require("lodash");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageSrc: { type: String, required: true },
    price: { type: Number, required: true, min: 10 },
    minPieces: { type: Number, required: true, min: 10 },
    availableAmount: { type: Number, required: true, min: 10 },
    companyId: {
      type: mongoose.ObjectId,
      ref: "Company",
      required: true,
    },
    categoryId: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, ["name", "imageUrl", "price", "minPieces"]);
      },
    },
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
