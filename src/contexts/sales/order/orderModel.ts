import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
    },

    customerId: {
      type: SchemaTypes.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [
      {
        productId: {
          type: SchemaTypes.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },

        status: {
          type: String,
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Order = model("Order", orderSchema);
export default Order;
