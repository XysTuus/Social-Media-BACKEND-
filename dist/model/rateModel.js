"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rateModel = new mongoose_1.Schema({
    rater: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
        required: true,
    },
    ratedUser: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("rates", rateModel);
