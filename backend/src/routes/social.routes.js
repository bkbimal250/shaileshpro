import express from "express";
import { 
  getSocials, 
  getSocialById, 
  createSocial, 
  updateSocial, 
  deleteSocial 
} from "../controllers/social.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getSocials)
  .post(protect, createSocial); // Admin Only

router.route("/:id")
  .get(getSocialById)
  .put(protect, updateSocial) // Admin Only
  .delete(protect, deleteSocial); // Admin Only

export default router;
