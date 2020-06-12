const mongoose = require("mongoose");
const _ = require("lodash");

const companySchema = new mongoose.Schema(
  {
    
    paymentTypes: [
      {
        type: mongoose.ObjectId,
        ref: "PaymentType",
        required: true,
      },
    ],
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, [
          "id",
          "orders",
          "description",
          "paymentTypes",
          "userId",
        ]);
      },
    },
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
