"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentModel = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "users",
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    replies: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "replies",
            default: [],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    like: {
        type: [],
        default: ["0"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("comments", commentModel);
