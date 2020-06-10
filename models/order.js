var mongoose = require("mongoose");
const _ = require("lodash");

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    // product: [], //of Ids
    date: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.ObjectId,
        required: true,
    },
    cafeId: {
        type: mongoose.ObjectId,
        required: true,
    },
    comments: {
        type: String,
    },
    paymentType: {
        type: mongoose.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc) => {
            return _.pick(doc, [
                "id",
                "date",
                "companyId",
                "cafeId",
                "comments",
                "paymentType",
            ]);
        },
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;