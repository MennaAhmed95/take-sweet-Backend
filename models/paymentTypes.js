const mongoose = require("mongoose")
const _ = require("lodash");
const paymentTypesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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