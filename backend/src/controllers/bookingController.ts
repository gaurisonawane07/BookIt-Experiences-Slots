import { Request, Response } from "express";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, name, email, slotDate, slotTime, totalPrice } = req.body;

    // Check experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    // Prevent double booking of same slot
    const existingBooking = await Booking.findOne({ experienceId, slotDate, slotTime });
    if (existingBooking) return res.status(400).json({ message: "Slot already booked" });



    // Create booking
    const newBooking = await Booking.create({
      experienceId,
      name,
      email,
      slotDate,
      slotTime,
      totalPrice,
      status: "confirmed",
    });

    // Update experience slot to booked
    await Experience.updateOne(
      { _id: experienceId, "slots.date": slotDate, "slots.time": slotTime },
      { $set: { "slots.$.isBooked": true } }
    );

    res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("experienceId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};