const express = require('express');
const router = express.Router();

const Company = require('../models/company');
const authenticationmiddleWare = require('../middleware/authentecation');

require('express-async-errors');

module.exports = router;

//get all companies
router.get("/", async (req, res, next) => {
    const companies = await Company.find().populate('userId')
        .populate('orders')
        .populate('paymentTypes')
        .populate('products');
    res.status(200).json(companies);
})

// add new cafe
router.post('/addCompany', authenticationmiddleWare, async (req, res, next) => {
    const userId = req.user.id
    const {
        orders,
        description,
        paymentTypes,
        products
    } = req.body;
    const company = new Company({
        orders,
        description,
        paymentTypes,
        products,
        userId,
    });
    await company.save();
    res.json(company)
})

//edit company
router.patch('/', async (req, res, next) => {
    const id = req.user.id
    const {
        orders,
        description,
        paymentTypes,
        products,
        userId,
    } = req.body;
    const company = await Company.findByIdAndUpdate(id, {
        $set: {
            orders,
            description,
            paymentTypes,
            products,
            userId,
        }
    }, {
        new: true,
        runValidators: true,
        omitUndefined: true
    });
    res.status(200).json(company)
})

//delete company by id
router.delete('/', authenticationmiddleWare, async (req, res, next) => {
    const id = req.user.id;
    const company = await Company.findByIdAndDelete(id);
    res.status(200).json(company)
})

//get companies by id
router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    const company = await Cafe.findById(id).populate('userId')
        .populate('orders')
        .populate('paymentTypes')
        .populate('products');
    res.status(200).json(company);
});