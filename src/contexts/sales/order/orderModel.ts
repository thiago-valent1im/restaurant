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

    combos: [
      {
        comboId: {
          type: SchemaTypes.ObjectId,
          ref: "Combo",
          required: true,
        },

        selections: [
          {
            sectionId: {
              type: String,
              required: true,
            },

            productId: {
              type: SchemaTypes.ObjectId,
              ref: "Product",
              required: true,
            },

            price: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
      },
    ],

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
