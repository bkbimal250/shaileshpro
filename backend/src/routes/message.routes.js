import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getMessages) // Admin Only
  .post(createMessage);

router.route("/:id")
  .delete(protect, deleteMessage); // Admin Only

export default router;
