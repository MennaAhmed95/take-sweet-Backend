const mongoose = require("mongoose")
const _ = require("lodash");
const cafeSchema = new mongoose.Schema({
    // orders: [],
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc) => {
            return _.pick(doc, [
                "id",
                "description",
                "userId"
            ]);
        },
    },
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe