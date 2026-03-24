import Project from "../models/Project.js";
import Message from "../models/Message.js";
import Experience from "../models/Experience.js";
import Social from "../models/Social.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get dashboard stats summary
// @route   GET /api/dashboard/stats
// @access  Admin (Protected)
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [projectsCount, messagesCount, experiencesCount, socialsCount] = await Promise.all([
    Project.countDocuments(),
    Message.countDocuments(),
    Experience.countDocuments(),
    Social.countDocuments(),
  ]);

  const latestMessages = await Message.find().sort("-createdAt").limit(5);

  res.status(200).json({
    success: true,
    data: {
      projects: projectsCount,
      messages: messagesCount,
      experiences: experiencesCount,
      socials: socialsCount,
      latestMessages,
    },
  });
});
