"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postModel = new mongoose_1.Schema({
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
    like: {
        type: [],
        default: ["0"],
    },
    comment: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "comments",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("posts", postModel);
