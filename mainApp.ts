import { Application, Request, Response, NextFunction } from "express";
import userRouter from "./Router/userRouter";
import rateRouter from "./Router/rateRouter";
import commentRouter from "./Router/commentRouter";
import postRouter from "./Router/postRouter";

export const mainApp = (app: Application) => {
  try {
    // Define API routes
    app.use("/api/user", userRouter);
    app.use("/api/rate", rateRouter);
    app.use("/api/comment", commentRouter);
    app.use("/api/post", postRouter);

    // Root route
    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "Awesome APi",
        });
      } catch (error) {
        res.status(404).json({
          message: "Error",
        });
      }
    });

    // Global error-handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.message); // Log the error
      res.status(500).json({ message: "Internal Server Error" });
    });
  } catch (error) {
    console.error("Error initializing main app:", error);
  }
};
