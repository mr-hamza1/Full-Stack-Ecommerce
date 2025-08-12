import { model, Schema, Types }  from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: String,
      required: true, // optional if product is required instead
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product", // Reference to Product model
      required: true, // optional if userId is required instead
    },
  },
  {
    timestamps: true,
  }
);



export const Cart = model("Cart", schema);
