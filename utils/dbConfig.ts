import { connect } from "mongoose";

export const dbConfig = async () => {
  try {
    console.log("Attempting to connect to the database...");
    await connect(process.env.MONGO_DB as string);
    console.log("Connected Successfully ❤️❤️🚀❤️");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Propagate the error to stop the server from proceeding
  }
};
