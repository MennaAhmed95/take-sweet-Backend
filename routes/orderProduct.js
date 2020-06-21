const express = require("express");
const router = express.Router();
const OrderProduct = require("../models/orderProduct");
// const { orderProductAuthorization } = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");
require("express-async-errors");
const _ = require("lodash");
const multer = require("multer");

// get All orderProducts
router.get("/", async (req, res, next) => {
  const orderProducts = await OrderProduct.find().populate("categoryId");

  res.send(orderProducts);
});

// router.post("/imageUpload", (req, res, next) => {
//   const image = req.file;
//   const imagePath = image.path;
//   const imageUrl = imagePath.replace("\\", "/");
//   res.json({
//     imageUrl,
//   });
// });

// //get All orderProducts By userId
// router.get("/orderProducts/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const orderProducts = await orderProduct
//     .find({
//       userId: id,
//     })
//     .populate("categoryId")
//     .populate("userId");
//   res.json(orderProducts);
//   // res.send(orderProducts);
// });

router.post(
  "/addOrderProduct",
  // authenticationmiddleWare,
  async (req, res, next) => {
    const {
      name,
      imageSrc,
      price,
      categoryId,
      amount,
      totalPrice,
      productId,
    } = req.body;
    // const userId = req.user.id;
    const orderProduct = new OrderProduct({
      productId,
      name,
      imageSrc,
      price,
      amount,
      totalPrice,
      categoryId,
      amount,
    });
    await orderProduct.save();
    res.json(orderProduct);
  }
);

// router.patch(
//   "/:id",
//   authenticationmiddleWare,
//   productAuthorization,
//   async (req, res, next) => {
//     const { id } = req.params;
//     const {
//       name,
//       imageSrc,
//       price,
//       minPieces,
//       availableAmount,
//       userId,
//       categoryId,
//       amount,
//     } = req.body;
//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         imageSrc,
//         price,
//         minPieces,
//         availableAmount,
//         userId,
//         categoryId,
//         amount,
//       },
//       {
//         new: true,
//         runValidators: true,
//         omitUndefined: true,
//       }
//     );
//     const newproducts = await Product.find()
//       .populate("categoryId")
//       .populate("userId");

//     res.status(200).json({
//       message: "product Edit Succssfully",
//       product,
//       newproducts,
//     });
//   }
// );

// router.delete(
//   "/:id",
//   authenticationmiddleWare,
//   productAuthorization,
//   async (req, res, next) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     res.status(200).json(product);
//   }
// );

// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findById(id)
//     .populate("categoryId")
//     .populate("userId");
//   res.status(200).json(product);
// });

module.exports = router;
