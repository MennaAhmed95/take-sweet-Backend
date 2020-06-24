var mongoose = require("mongoose");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const CustomError = require("../helpers/customError");
require("dotenv").config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
    },
    roleId: {
      type: mongoose.ObjectId,
      ref: "Role",
      required: true,
    },
    branches: [
      {
        type: mongoose.ObjectId,
        ref: "Branch",
        required: true,
      },
    ],
    description: {
      type: String,
    },
  },
  {
    collection: "users",
    toJSON: {
      virtuals: true,
      transform: (doc) => {
        return _.pick(doc, [
          "id",
          "userName",
          "email",
          "imageSrc",
          "roleId",
          "branches",
          "description",
        ]);
      },
    },
  }
);
userSchema.pre("save", async function () {
  const userInstance = this;
  if (this.isModified("password")) {
    userInstance.password = await bcrypt.hash(
      userInstance.password,
      saltRounds
    );
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  const userInstance = this;
  const p = userInstance.password;
  return bcrypt.compare(plainPassword, p);
};

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

userSchema.methods.generateToken = function (expiresIn = "8000m") {
  const userInstance = this;
  return sign(
    {
      userId: userInstance.id,
    },
    jwtSecret,
    {
      expiresIn,
    }
  );
};

userSchema.statics.getUserFromToken = async function (token) {
  const User = this;
  const payload = await verify(token, jwtSecret);
  const currentUser = await User.findById(payload.userId);
  if (!currentUser)
    throw CustomError(
      "Are You Sure From Your Data ... This user Not Found ",
      404
    );
  return currentUser;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
