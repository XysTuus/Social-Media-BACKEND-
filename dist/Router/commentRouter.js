"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controller/commentController");
const commentRouter = (0, express_1.Router)();
commentRouter.route("/create-comment/:postID/:userID").post(commentController_1.createComment);
commentRouter
    .route("/reply-comment/:postID/:userID/:commentID")
    .post(commentController_1.replyAUserComment);
commentRouter
    .route("/like-user-comment/:userID/:commentID")
    .patch(commentController_1.likeOneUserComment);
commentRouter.route("/post/:postID/comments").get(commentController_1.getAllCommentsOnPost);
exports.default = commentRouter;
