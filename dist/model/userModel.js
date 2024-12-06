"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    userName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedToken: {
        type: String,
    },
    post: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "posts",
        },
    ],
    ratings: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "rates", // Reference to the rate model
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
