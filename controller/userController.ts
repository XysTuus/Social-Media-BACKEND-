import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import rateModel from "../model/rateModel";
import { Types } from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Validation failed: Duplicate email");
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    console.log("Hashing complete, creating user...");
    const user = await userModel.create({
      userName,
      email,
      password: hashed,
    });

    console.log("User created successfully:", user);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const userAccount = await userModel.findOne({ email });

    if (userAccount) {
      const compare = bcrypt.compare(password, userAccount!.password);
      if (!compare) {
        return res.status(404).json({
          message: "credentials do not match",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with Email",
      });
    }

    return res.status(200).json({
      message: "user logged in successfully",
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating account",
      data: error,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "user exists",
      data: user,
      status: 200,
    });
  } catch (error) {
    return error;
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    console.log(user);
    return res.status(200).json({
      message: "All users extracted succesfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const rateUser = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;
    const { ratedUserID, raterID } = req.params;

    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 0 and 5" });
    }

    const ratedUser = await userModel.findById(ratedUserID);
    if (!ratedUser) {
      return res.status(404).json({ message: "User to be rated not found" });
    }
    const rater = await userModel.findById(raterID);
    if (!rater) {
      return res.status(404).json({ message: "Rater to rate not found" });
    }

    const existingRating = await rateModel.findOne({
      rater: rater._id,
      ratedUser: ratedUser._id,
    });
    if (existingRating) {
      existingRating.rating = new rating();
      existingRating.save();
    } else {
      const rateArray = await rateModel.create({
        rater: rater._id,
        ratedUser: ratedUser._id,
        rating,
      });
      ratedUser?.ratings.push(new Types.ObjectId(rateArray?.rating));
      ratedUser?.save();
    }

    return res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUserRating = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const ratings = await rateModel.find({ ratedUser: userID });
    const averageRating =
      ratings.reduce((sum, rate) => sum + rate.rating, 0) /
      (ratings.length || 1);

    return res.status(200).json({
      message: "User rating fetched successfully",
      averageRating,
      totalRatings: ratings.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
