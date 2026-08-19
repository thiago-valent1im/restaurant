import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      minLength: 10,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Customer = model("Customer", customerSchema);
export default Customer;
