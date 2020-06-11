const express = require("express");
const router = express.Router();

const Order = require("../models/order");

const authorizationMiddleWare = require("../middleware/authorization");
const authenticationmiddleWare = require("../middleware/authentecation");

require("express-async-errors");
const _ = require("lodash");

//get all orders
router.get("/", async (req, res, next) => {
    const orders = await Order.find()
        .populate("productId")
        .populate("companyId")
        .populate("cafeId");
    res.send(orders);
});

//add new order by cafeId
router.post("/addOrder", authenticationmiddleWare, async (req, res, next) => {
    const {
        date,
        statue,
        products,
        company,
        cafe,
        comments,
        paymentType
    } = req.body;
    const cafeId = req.user.id;
    const product = new Order({
        date,
        statue,
        products,
        company,
        cafe,
        comments,
        paymentType
    });
    await order.save();
    res.json(order);
});

//edit order by cafeId
router.patch(
    "/:id",
    authenticationmiddleWare,
    authorizationMiddleWare,
    async (req, res, next) => {
        const {
            id
        } = req.params;
        const {
            date,
            statue,
            products,
            company,
            cafe,
            comments,
            paymentType
        } = req.body;
        const order = await Order.findByIdAndUpdate(
            id, {
                date,
                statue,
                products,
                company,
                cafe,
                comments,
                paymentType
            }, {
                new: true,
                runValidators: true,
                omitUndefined: true,
            }
        );
        res.status(200).json({
            message: "order Edit Succssfully",
            order,
        });
    }
);

//delete order
router.delete(
    "/:id",
    authenticationmiddleWare,
    authorizationMiddleWare,
    async (req, res, next) => {
        const {
            id
        } = req.params;
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    }
);

// get orders by id
router.get("/:id", async (req, res, next) => {
    const {
        id
    } = req.params;
    const order = await Order.findById(id).populate("productId");
    res.status(200).json(order);
});

module.exports = router;