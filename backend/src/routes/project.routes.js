import express from "express";
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getProjects)
  .post(protect, createProject); // Admin Only

router.route("/:id")
  .get(getProjectById)
  .put(protect, updateProject) // Admin Only
  .delete(protect, deleteProject); // Admin Only

export default router;
