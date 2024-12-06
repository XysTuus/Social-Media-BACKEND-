"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./Router/userRouter"));
const rateRouter_1 = __importDefault(require("./Router/rateRouter"));
const commentRouter_1 = __importDefault(require("./Router/commentRouter"));
const postRouter_1 = __importDefault(require("./Router/postRouter"));
const mainApp = (app) => {
    try {
        // Define API routes
        app.use("/api/user", userRouter_1.default);
        app.use("/api/rate", rateRouter_1.default);
        app.use("/api/comment", commentRouter_1.default);
        app.use("/api/post", postRouter_1.default);
        // Root route
        app.get("/", (req, res) => {
            try {
                res.status(200).json({
                    message: "Awesome APi",
                });
            }
            catch (error) {
                res.status(404).json({
                    message: "Error",
                });
            }
        });
        // Global error-handling middleware
        app.use((err, req, res, next) => {
            console.error(err.message); // Log the error
            res.status(500).json({ message: "Internal Server Error" });
        });
    }
    catch (error) {
        console.error("Error initializing main app:", error);
    }
};
exports.mainApp = mainApp;
