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
exports.getUserRating = exports.rateUser = exports.getAllUser = exports.getOneUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
const rateModel_1 = __importDefault(require("../model/rateModel"));
const mongoose_1 = require("mongoose");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request body:", req.body);
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            console.log("Validation failed: Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            console.log("Validation failed: Duplicate email");
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        console.log("Hashing complete, creating user...");
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
        });
        console.log("User created successfully:", user);
        return res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error in createUser:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userAccount = yield userModel_1.default.findOne({ email });
        if (userAccount) {
            const compare = bcrypt_1.default.compare(password, userAccount.password);
            if (!compare) {
                return res.status(404).json({
                    message: "credentials do not match",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error with Email",
            });
        }
        return res.status(200).json({
            message: "user logged in successfully",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating account",
            data: error,
        });
    }
});
exports.loginUser = loginUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "user exists",
            data: user,
            status: 200,
        });
    }
    catch (error) {
        return error;
    }
});
exports.getOneUser = getOneUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        console.log(user);
        return res.status(200).json({
            message: "All users extracted succesfully",
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
exports.getAllUser = getAllUser;
const rateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating } = req.body;
        const { ratedUserID, raterID } = req.params;
        if (rating < 0 || rating > 5) {
            return res
                .status(400)
                .json({ message: "Rating must be between 0 and 5" });
        }
        const ratedUser = yield userModel_1.default.findById(ratedUserID);
        if (!ratedUser) {
            return res.status(404).json({ message: "User to be rated not found" });
        }
        const rater = yield userModel_1.default.findById(raterID);
        if (!rater) {
            return res.status(404).json({ message: "Rater to rate not found" });
        }
        const existingRating = yield rateModel_1.default.findOne({
            rater: rater._id,
            ratedUser: ratedUser._id,
        });
        if (existingRating) {
            existingRating.rating = new rating();
            existingRating.save();
        }
        else {
            const rateArray = yield rateModel_1.default.create({
                rater: rater._id,
                ratedUser: ratedUser._id,
                rating,
            });
            ratedUser === null || ratedUser === void 0 ? void 0 : ratedUser.ratings.push(new mongoose_1.Types.ObjectId(rateArray === null || rateArray === void 0 ? void 0 : rateArray.rating));
            ratedUser === null || ratedUser === void 0 ? void 0 : ratedUser.save();
        }
        return res.status(200).json({ message: "Rating submitted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.rateUser = rateUser;
const getUserRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const ratings = yield rateModel_1.default.find({ ratedUser: userID });
        const averageRating = ratings.reduce((sum, rate) => sum + rate.rating, 0) /
            (ratings.length || 1);
        return res.status(200).json({
            message: "User rating fetched successfully",
            averageRating,
            totalRatings: ratings.length,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getUserRating = getUserRating;
