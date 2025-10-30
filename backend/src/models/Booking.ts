import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  slotDate: string;
  slotTime: string;
  totalPrice: number;
  status: "confirmed" | "failed";
}

const BookingSchema = new Schema<IBooking>(
  {
    experienceId: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
