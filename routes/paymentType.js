const express = require('express');
const router = express.Router();

const PaymentType = require('../models/paymentType');
const validationMiddleWare = require('../middleware/validation')
const authorizationMiddleWare = require('../middleWare/authorization')
const authenticationmiddleWare = require('../middleware/authentecation');

require('express-async-errors');

module.exports = router;

// get all payment types
router.get("/", async (req, res, next) => {
    const paymentType = await PaymentType.find()
    res.status(200).json(paymentType);
})


//add new payment type
router.post('/addPaymentType', async (req, res, next) => {

    const {
        name
    } = req.body;
    const paymentType = new PaymentType({
        name

    });
    await paymentType.save();
    res.json(paymentType)

})
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const {
        name,
        src,
        checked
    } = req.body;
    const paymentType = await PaymentType.findByIdAndUpdate(id, {
        name,
        src,
        checked
    }, {
        new: true,
        runValidators: true,
        omitUndefined: true,
    });
    const paymentTypeList = await PaymentType.find();


    res.status(200).json({
        message: "payment Updated",
        paymentType,paymentTypeList
    })

})


//delete payment type by id
router.delete('/:id', authenticationmiddleWare, async (req, res, next) => {
    const id = req.user.id;
    const paymentType = await PaymentType.findByIdAndDelete(id);
    res.status(200).json(paymentType)
})
router.get('/:id',  async (req, res, next) => {
    const id = req.params.id;
    const paymentType = await PaymentType.findById(id)
    res.status(200).json(paymentType);
})