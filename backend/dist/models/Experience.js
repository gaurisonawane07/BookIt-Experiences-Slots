import mongoose, { Schema } from "mongoose";
const SlotSchema = new Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
});
const ExperienceSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    slots: [SlotSchema],
}, { timestamps: true });
export default mongoose.model("Experience", ExperienceSchema);
//# sourceMappingURL=Experience.js.map