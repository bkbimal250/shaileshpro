import Social from "../models/Social.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all social profiles
// @route   GET /api/socials
// @access  Public
export const getSocials = asyncHandler(async (req, res) => {
  const socials = await Social.find({ isActive: true }).sort("order createdAt");
  res.status(200).json({
    success: true,
    count: socials.length,
    data: socials,
  });
});

// @desc    Get single social profile
// @route   GET /api/socials/:id
// @access  Public
export const getSocialById = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    res.status(404);
    throw new Error("Social profile not found");
  }

  res.status(200).json({
    success: true,
    data: social,
  });
});

// @desc    Create a social profile
// @route   POST /api/socials
// @access  Admin (Protected)
export const createSocial = asyncHandler(async (req, res) => {
  const social = await Social.create(req.body);
  res.status(201).json({
    success: true,
    data: social,
  });
});

// @desc    Update a social profile
// @route   PUT /api/socials/:id
// @access  Admin (Protected)
export const updateSocial = asyncHandler(async (req, res) => {
  const social = await Social.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!social) {
    res.status(404);
    throw new Error("Social profile not found");
  }

  res.status(200).json({
    success: true,
    data: social,
  });
});

// @desc    Delete a social profile
// @route   DELETE /api/socials/:id
// @access  Admin (Protected)
export const deleteSocial = asyncHandler(async (req, res) => {
  const social = await Social.findByIdAndDelete(req.params.id);

  if (!social) {
    res.status(404);
    throw new Error("Social profile not found");
  }

  res.status(200).json({
    success: true,
    message: "Social profile deleted successfully",
  });
});