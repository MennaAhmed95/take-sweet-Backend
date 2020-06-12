const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
require("express-async-errors");
const _ = require("lodash");

router.get("/", async (req, res, next) => {
  debugger;
  const branchs = await Branch.find();
  res.send(branchs);
});

router.post("/addBranch", async (req, res, next) => {
  const { city, phoneNumber, address } = req.body;
  const branch = new Branch({
    city,
    phoneNumber,
    address,
  });
  await branch.save();
  res.json(branch);
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { city, phoneNumber, address } = req.body;
  const branch = await Branch.findByIdAndUpdate(
    id,
    {
      city,
      phoneNumber,
      address,
    },
    {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  );
  res.status(200).json({
    message: "branch Edit Succssfully",
    branch,
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findByIdAndDelete(id);
  res.status(200).json(branch);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findById(id);
  res.status(200).json(branch);
});

module.exports = router;
