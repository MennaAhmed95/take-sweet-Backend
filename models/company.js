const mongoose = require("mongoose");
const _ = require("lodash");

const companySchema = new mongoose.Schema({
    orders: {
        type: [mongoose.ObjectId],
        required: true,
    },
    description: {
        type: String,
    },
    paymentTypes: {
        type: [mongoose.ObjectId],
        required: true,
    },
    // products: [],
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
                "userId",
            ]);
        },
    },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;