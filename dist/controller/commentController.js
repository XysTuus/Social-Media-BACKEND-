"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsOnPost = exports.replyAUserComment = exports.likeOneUserComment = exports.createComment = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
const commentModel_1 = __importDefault(require("../model/commentModel"));
const mongoose_1 = require("mongoose");
const replyModel_1 = __importDefault(require("../model/replyModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, postID } = req.params;
        const { message } = req.body;
        const findUser = yield userModel_1.default.findById(userID);
        if (findUser) {
            const findPost = yield postModel_1.default.findById(postID);
            if (findPost) {
                const comment = yield commentModel_1.default.create({
                    message,
                    createdAt: Date.now(),
                    userID: findUser._id,
                });
                findPost === null || findPost === void 0 ? void 0 : findPost.comment.push(new mongoose_1.Types.ObjectId(comment === null || comment === void 0 ? void 0 : comment._id));
                findPost.save();
                return res.status(201).json({
                    message: "User's post created successfully",
                    data: comment,
                    status: 201,
                });
            }
            else {
                return res.status(404).json({
                    error: "Error creating comment for post",
                });
            }
        }
        else {
            return res.status(404).json({
                error: "You are not authorized to create a comment, not a user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            error: error,
        });
    }
});
exports.createComment = createComment;
const likeOneUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, commentID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const comment = yield commentModel_1.default.findById(commentID);
        yield commentModel_1.default.findByIdAndUpdate(commentID, {
            like: [comment.like, userID],
        }, { new: true });
        return res.status(200).json({
            message: "like created successfully",
            data: user,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            error: error,
        });
    }
});
exports.likeOneUserComment = likeOneUserComment;
const replyAUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, commentID, postID } = req.params;
        const { message } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const post = yield postModel_1.default.findById(postID);
            if (post) {
                const comment = yield commentModel_1.default.findById(commentID);
                if (comment) {
                    const reply = yield replyModel_1.default.create({
                        message,
                        user: userID,
                        commentID,
                        createdAt: Date.now(),
                    });
                    comment.replies.push(new mongoose_1.Types.ObjectId(reply === null || reply === void 0 ? void 0 : reply.id));
                    comment.save();
                    return res
                        .status(201)
                        .json({ message: "Reply added successfully", reply: reply });
                }
                else {
                    return res.status(404).json({ message: "Comment not found" });
                }
            }
            else {
                return res.status(404).json({ message: "there is no activity here" });
            }
        }
        else {
            return res.status(404).json({ message: "not a user so cannot reply" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.replyAUserComment = replyAUserComment;
const getAllCommentsOnPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID).populate({
            path: "comment",
            model: commentModel_1.default,
            populate: [
                {
                    path: "userID",
                    model: userModel_1.default,
                    select: "userName email avatar",
                },
                {
                    path: "replies",
                    model: replyModel_1.default,
                    populate: {
                        path: "user",
                        model: userModel_1.default,
                        select: "userName email avatar",
                    },
                },
            ],
        });
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        console.log(post.comment);
        return res.status(200).json({
            message: "All comments on the post retrieved successfully",
            data: post.comment,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching comments",
            error: error,
        });
    }
});
exports.getAllCommentsOnPost = getAllCommentsOnPost;
