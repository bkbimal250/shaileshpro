import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  employmentType: {
    type: String, // Full-time, Freelance, Internship
  },

  location: {
    type: String, // Mumbai, Remote
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date, // null if current
  },

  isCurrent: {
    type: Boolean,
    default: false,
  },

  description: {
    type: String, // short overview
  },

  achievements: [
    {
      type: String,
    }
  ],

  tools: [
    {
      type: String, // Meta Ads, Google Ads, Canva
    }
  ],

  metrics: [
    {
      label: String,   // "Engagement"
      value: String,   // "+300%"
    }
  ],

  companyLogo: {
    type: String, // image URL
  },

  projectLinks: [
    {
      title: String,
      url: String,
    }
  ],

  order: {
    type: Number, // for sorting (latest first)
  },

  isActive: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);