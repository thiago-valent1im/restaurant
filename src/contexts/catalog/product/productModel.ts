import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Product = model("Product", productSchema);
export default Product;
