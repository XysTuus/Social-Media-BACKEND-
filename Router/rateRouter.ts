import { Router } from "express";
import { getUserRating, rateUser } from "../controller/userController";

const rateRouter: any = Router();

rateRouter.route("/rate-user/:ratedUserID/:raterID").post(rateUser);

rateRouter.route("/get-all-user-rating/:userID/rating").get(getUserRating);

export default rateRouter;
