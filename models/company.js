const mongoose = require("mongoose");
const _ = require("lodash");

const companySchema = new mongoose.Schema({
    orders: [{
        type: mongoose.ObjectId,
        ref: "Order",
        required: true,
    }],
    description: {
        type: String,
    },
    paymentTypes: [{
        type: mongoose.ObjectId,
        ref: "PaymentType",
        required: true,
    }],
    productsIds: [{
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
    }],
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc) => {
            return _.pick(doc, [
                "id",
                "orders",
                "description",
                "paymentTypes",
                "products",
                "userId",
            ]);
        },
    },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;