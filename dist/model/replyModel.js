"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const replyModel = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
    commentId: {
        type: mongoose_1.Types.ObjectId,
        ref: "comments",
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    like: {
        type: [],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("replies", replyModel);
