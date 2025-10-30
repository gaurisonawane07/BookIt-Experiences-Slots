import mongoose, { Schema, Document } from "mongoose";

export interface IPromo extends Document {
  code: string;
  discountType: "percentage" | "flat";
  amount: number;
}

const PromoSchema = new Schema<IPromo>(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPromo>("Promo", PromoSchema);
