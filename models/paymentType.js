const mongoose = require("mongoose")
const _ = require("lodash");
const paymentTypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: (doc) => {
            return _.pick(doc, [
                "id",
                "name"
            ]);
        },
    },
});

const PaymentTypes = mongoose.model("PaymentTypes", paymentTypesSchema);

module.exports = PaymentTypes;