const mongoose = require("mongoose");
const _ = require("lodash");

const orderProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.ObjectId,
      ref: "Product",
      required: true,
    },
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
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc) => {
        return _.pick(doc, [
          "id",
          "productId",
          "name",
          "imageSrc",
          "price",
          "categoryId",
          "amount",
          "totalPrice",
        ]);
      },
    },
  }
);

const Branch = mongoose.model("OrderProduct", orderProductSchema);

module.exports = Branch;
