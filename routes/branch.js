const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
const {orderAuthorization} = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
const _ = require("lodash");

router.get("/", async (req, res, next) => {
  debugger;
  const branchs = await Branch.find().populate("roleId");
  res.send(branchs);
});

router.post("/addBranch", authenticationmiddleWare, async (req, res, next) => {
  const { city, roleId, phoneNumper, address } = req.body;
  const branch = new Branch({
    city,
    roleId,
    phoneNumper,
    address,
  });
  await branch.save();
  res.json(branch);
});

router.patch(
  "/:id",
  authenticationmiddleWare,
  orderAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const { city, roleId, phoneNumper, address } = req.body;
    const branch = await Branch.findByIdAndUpdate(
      id,
      {
        city,
        roleId,
        phoneNumper,
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
  }
);

router.delete(
  "/:id",
  authenticationmiddleWare,
  orderAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const branch = await Branch.findByIdAndDelete(id);
    res.status(200).json(branch);
  }
);

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findById(id).populate("roleId");
  res.status(200).json(branch);
});

module.exports = router;
