import mongoose, { Schema, Document } from "mongoose";

export interface ISlot {
  date: string;
  time: string;
  isBooked: boolean;
}

export interface IExperience extends Document {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  price: number;
  slots: ISlot[];
}

const SlotSchema = new Schema<ISlot>({
  date: { type: String, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    slots: [SlotSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
