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

//delete payment type by id
router.delete('/:id', authenticationmiddleWare, async (req, res, next) => {
    const id = req.user.id;
    const paymentType = await PaymentType.findByIdAndDelete(id);
    res.status(200).json(paymentType)
})