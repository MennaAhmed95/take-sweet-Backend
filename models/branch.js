const mongoose = require("mongoose");
const _ = require("lodash");

const branchSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc) => {
        return _.pick(doc, ["id", "city", "phoneNumber", "address"]);
      },
    },
  }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
