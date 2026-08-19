import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const URI = process.env.MONGODB_URI;

    if (!URI) {
      throw new Error(
        "MONGODB_URI environment variable is not defined. Please check your .env file and ensure it contains a valid MongoDB connection string.",
      );
    }

    await mongoose.connect(URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    throw error;
  }
}
