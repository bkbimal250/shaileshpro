import express from "express";
import { 
  getExperiences, 
  getExperienceById, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getExperiences)
  .post(protect, createExperience); // Admin Only

router.route("/:id")
  .get(getExperienceById)
  .put(protect, updateExperience) // Admin Only
  .delete(protect, deleteExperience); // Admin Only

export default router;
