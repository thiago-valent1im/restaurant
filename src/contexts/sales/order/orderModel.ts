import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      default: "pending",
    },

    customerId: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: String,
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
          required: true,
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
