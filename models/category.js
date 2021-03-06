const mongoose = require("mongoose");
const _ = require("lodash");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc) => {
        return _.pick(doc, ["id", "name"]);
      },
    },
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
