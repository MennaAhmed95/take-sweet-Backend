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
  const cafe = new Cafe({
    userId
  });
  await cafe.save();
  res.json(cafe);
});

router.patch("/:id", authenticationmiddleWare, async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id
  const cafe = await Cafe.findByIdAndUpdate(
    id, {
      $set: {
        userId
      },
    }, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  ).populate("userId");
  res.status(200).json(cafe);
});

router.delete("/:id", authenticationmiddleWare, async (req, res, next) => {
  const id = req.params.id;
  const cafe = await Cafe.findByIdAndDelete(id);
  res.status(200).json(cafe);
});


router.get("/getByUserId", authenticationmiddleWare, async (req, res, next) => {
  const userId = req.user.id
  const cafe = await Cafe.find({
      userId
    })
    .populate("userId");

  res.status(200).json(cafe[0]);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const cafe = await Cafe.findById(id).populate("userId");
  res.status(200).json(cafe);
}); 


