const mongoose = require("mongoose");
const _ = require("lodash");
const cafeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc) => {
      return _.pick(doc, ["id", "userId"]);
    },
  },
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;