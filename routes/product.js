const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { productAuthorization } = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
const _ = require("lodash");
const multer = require("multer");

// get All Products
router.get("/", async (req, res, next) => {
  const products = await Product.find()
    .populate("categoryId")
    .populate("userId");
  res.send(products);
});

router.post("/imageUpload", (req, res, next) => {
  const image = req.file;
  const imagePath = image.path;
  const imageUrl = imagePath.replace("\\", "/");
  res.json({
    imageUrl,
  });
});

//get All Products By userId
router.get("/products/:id", async (req, res, next) => {
  let {search,categoryId,sortBy}=req.query
    let products;
    let category = categoryId ? {categoryId}:{}
    let searchValue = search ? { name: {$regex: new RegExp(".*"+ search.toLowerCase() +".*")}}:{}

    const id = req.params.id
    products = await Product.find({...searchValue,...category,userId: id}).populate("categoryId")
    .populate("userId");
    
    //////////sorting//////

    switch (sortBy) {
      case '0':
        products = _.orderBy(products,'name','asc')
        break;
      case '1':
          products = _.orderBy(products,`price`,`desc`)
        break;
      case '2':
          products = _.orderBy(products,`price`,`asc`)
        break;  
      default:
        break;
    }

    // const strSort = sortBy? sortBy.split(":") : "";
    // if(sortBy){
    //     if(strSort[0]==='name') products= _.orderBy(products,`${strSort[0]}`,'asc')
    //     else products = _.orderBy(products,`${strSort[0]}`,`${strSort[1]}`)
    // }
    res.json(products);


});

router.post("/addProduct", authenticationmiddleWare, async (req, res, next) => {
  const {
    name,
    imageSrc,
    price,
    minPieces,
    availableAmount,
    categoryId,
  } = req.body;
  const amount = minPieces;
  const userId = req.user.id;
  const product = new Product({
    name,
    imageSrc,
    price,
    minPieces,
    availableAmount,
    userId,
    categoryId,
    amount,
  });
  await product.save();
  res.json(product);
});

router.patch(
  "/:id",
  authenticationmiddleWare,
  productAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id
    const {
      name,
      imageSrc,
      price,
      minPieces,
      availableAmount,
      // userId,
      categoryId,
      amount,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        imageSrc,
        price,
        minPieces,
        availableAmount,
        userId,
        categoryId,
        amount,
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true,
      }
    );
    // const newproducts = await Product.find()
    //   .populate("categoryId")
    //   .populate("userId");

    res.status(200).json({
      message: "product Edit Succssfully",
      product,
    });
  }
);

router.delete(
  "/:id",
  authenticationmiddleWare,
  productAuthorization,
  async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  }
);

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("categoryId")
    .populate("userId");
  res.status(200).json(product);
});

module.exports = router;
