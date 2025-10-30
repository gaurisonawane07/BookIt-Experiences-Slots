import { Request, Response } from "express";
import Promo from "../models/Promo.js";

export const validatePromo = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({ code });

    if (!promo) return res.status(404).json({ valid: false, message: "Invalid promo code" });

    res.status(200).json({
      valid: true,
      discountType: promo.discountType,
      amount: promo.amount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating promo code", error });
  }
};
