import About from "../models/About.js";

// @desc    Get the about profile
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne().sort("-updatedAt");
    
    if (!about) {
      return res.status(404).json({ message: "About profile not found" });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update or create the about profile
// @route   POST /api/about
// @access  Admin (to be protected)
export const upsertAbout = async (req, res, next) => {
  try {
    // We assume there's only one about profile for the portfolio
    let about = await About.findOne();

    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      about = await About.create(req.body);
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};