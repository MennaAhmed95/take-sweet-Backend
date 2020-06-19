const express = require("express");
const router = express.Router();

const Company = require("../models/company");
const authenticationmiddleWare = require("../middleware/authentecation");

require("express-async-errors");

module.exports = router;

//get all companies
router.get("/", async (req, res, next) => {
  const companies = await Company.find()
    .populate("userId")
    // .populate("orders")
    .populate("paymentTypes");
  res.status(200).json(companies);
});

// add new company
router.post("/addCompany", authenticationmiddleWare, async (req, res, next) => {
  const userId = req.user.id;
  const {
    description,
    paymentTypes
  } = req.body;
  const company = new Company({
    // orders,
    description,
    paymentTypes,
    userId,
  });
  await company.save();
  res.json(company);
});

//edit company
router.patch("/:id", async (req, res, next) => {
  // const id = req.user.id;
  const id = req.params.id;
  const {
    description,
    paymentTypes,
    userId
  } = req.body;
  const company = await Company.findByIdAndUpdate(
    id, {
      $set: {
        // orders,
        description,
        paymentTypes,
        userId,
      },
    }, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  );
  res.status(200).json(company);
});

//delete company by id
router.delete("/:id", authenticationmiddleWare, async (req, res, next) => {
  const id = req.params.id;
  const company = await Company.findByIdAndDelete(id);
  res.status(200).json(company);
});

//get companies by userid
router.get("/getByUserId", authenticationmiddleWare, async (req, res, next) => {
  const userId = req.user.id
  const company = await Company.find({
      userId
    })
    .populate("paymentTypes").populate("userId");

  res.status(200).json(company);
});