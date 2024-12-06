"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const rateRouter = (0, express_1.Router)();
rateRouter.route("/rate-user/:ratedUserID/:raterID").post(userController_1.rateUser);
rateRouter.route("/get-all-user-rating/:userID/rating").get(userController_1.getUserRating);
exports.default = rateRouter;
