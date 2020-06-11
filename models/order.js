var mongoose = require("mongoose");
const _ = require("lodash");

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    companyId: {
      type: mongoose.ObjectId,
      ref: "Company",
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: String,
    },
    paymentType: {
      type: mongoose.ObjectId,
      ref: "PaymentType",
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
          "date",
          "products",
          "companyId",
          "cafeId",
          "comments",
          "paymentType",
        ]);
      },
    },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
