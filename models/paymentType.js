const mongoose = require("mongoose");
const _ = require("lodash");
const paymentTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, ["id", "name"]);
      },
    },
  }
);

const PaymentType = mongoose.model("PaymentType", paymentTypeSchema);

module.exports = PaymentType;
