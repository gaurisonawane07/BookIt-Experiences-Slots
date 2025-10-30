import mongoose, { Schema } from "mongoose";
const BookingSchema = new Schema({
    experienceId: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
}, { timestamps: true });
export default mongoose.model("Booking", BookingSchema);
//# sourceMappingURL=Booking.js.map