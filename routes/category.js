const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const validationMiddleWare = require("../middleware/validation");
const authorizationMiddleWare = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
module.exports = router;

router.get("/", async (req, res, next) => {

  const categories = await Category.find();
  res.status(200).json(categories);
});

router.post("/addCategory", async (req, res, next) => {
  
  const { name } = req.body;
  const category = new Category({
    name,
  });
  await category.save();
  res.json(category);
});
