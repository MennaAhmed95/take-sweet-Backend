const express = require("express");
const router = express.Router();
const Cafe = require("../models/cafe");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");

module.exports = router;

router.get("/", async (req, res, next) => {
  const cafes = await Cafe.find().populate("userId");
  res.status(200).json(cafes);
});

router.post("/addCafe", authenticationmiddleWare, async (req, res, next) => {
  const userId = req.user.id;
  const {
    description,
    // orders
  } = req.body;
  const cafe = new Cafe({
    description,
    userId,
    // orders
  });
  await cafe.save();
  res.json(cafe);
});

router.patch("/", async (req, res, next) => {
  const id = req.user.id;
  const { description, userId } = req.body;
  const cafe = await Cafe.findByIdAndUpdate(
    id,
    {
      $set: {
        description,
        userId,
        // orders,
      },
    },
    {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  );
  res.status(200).json(cafe);
});

router.delete("/", authenticationmiddleWare, async (req, res, next) => {
  const id = req.user.id;
  const cafe = await Cafe.findByIdAndDelete(id);
  res.status(200).json(cafe);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const cafe = await Cafe.findById(id).populate("userId");
  res.status(200).json(cafe);
});
