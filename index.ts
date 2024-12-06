import express, { Application } from "express";
import cors from "cors";
import env from "dotenv";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";

env.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
mainApp(app);
const port = process.env.PORT;
app.listen(port, async () => {
  console.log("Starting server...");
  try {
    await dbConfig(); // Ensure database is connected before logging server status
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Failed to initialize the server due to a database error.");
    process.exit(1); // Exit the process if database initialization fails
  }
});

console.log("server is running");
