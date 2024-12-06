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
exports.getAllPost = exports.getOneUserPost = exports.likeOneUserPost = exports.createPost = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
const mongoose_1 = require("mongoose");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const { message } = req.body;
    const findUser = yield userModel_1.default.findById(userID);
    if (findUser) {
        const post = yield postModel_1.default.create({
            message,
        });
        findUser.post.push(new mongoose_1.Types.ObjectId(post === null || post === void 0 ? void 0 : post._id));
        findUser.save();
        return res.status(201).json({
            message: "User's post created successfully",
            data: post,
            status: 201,
        });
    }
    else {
        return res.status(404).json({
            error: Error,
        });
    }
});
exports.createPost = createPost;
const likeOneUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, postID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const post = yield postModel_1.default.findById(postID);
        yield postModel_1.default.findByIdAndUpdate(postID, {
            like: [post.like, userID],
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
exports.likeOneUserPost = likeOneUserPost;
const getOneUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "post",
            options: {
                sort: {
                    createdt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "user created successfully",
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
exports.getOneUserPost = getOneUserPost;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.find();
        return res.status(200).json({
            message: "post created succesfully",
            data: post,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            error: error,
        });
    }
});
exports.getAllPost = getAllPost;
