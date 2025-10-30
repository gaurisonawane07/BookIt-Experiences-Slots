import { Router } from "express";
import { getExperiences, getExperienceById, createExperience } from "../controllers/experienceController.js";

const router = Router();

router.post("/", createExperience);
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

export default router;
