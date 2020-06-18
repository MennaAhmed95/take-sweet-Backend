const mongoose = require("mongoose");
const _ = require("lodash");
const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  }
}, {
  toJSON: {
    transform: (doc) => {
      return _.pick(doc, ["id", "src", "name","checked"]);
    },
  },
});

const PaymentType = mongoose.model("PaymentType", paymentTypeSchema);

module.exports = PaymentType;