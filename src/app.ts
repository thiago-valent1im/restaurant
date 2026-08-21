import express, { Request, Response } from "express";
import mongoose from "mongoose";
import customerRouter from "./contexts/customers/customer/customerRouter";
import comboRouter from "./contexts/sales/combo/comboRouter";
import orderRouter from "./contexts/sales/order/orderRouter";
import productRouter from "./contexts/catalog/product/productRouter";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/customers", customerRouter);
app.use("/api/combos", comboRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

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

export { app };

if (require.main === module) {
  startServer();
}
