import express from "express";
import { getAbout, upsertAbout } from "../controllers/about.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getAbout)
  .post(protect, upsertAbout); // Admin Only

export default router;
