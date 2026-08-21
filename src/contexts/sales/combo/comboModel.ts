import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;

const comboSchema = new Schema(
  {
    status: {
      type: String,
      default: "active",
    },

    sections: [
      {
        name: {
          type: String,
          required: true,
        },

        options: [
          {
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
  },
  {
    timestamps: true,
  },
);

const Combo = model("Combo", comboSchema);
export default Combo;
