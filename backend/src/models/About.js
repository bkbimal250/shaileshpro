import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String, // "Digital Marketing Specialist"
  },

  tagline: {
    type: String, // "GROW YOUR BRAND."
  },

  bio: {
    type: String, // short intro paragraph
  },

  longBio: {
    type: String, // detailed about section
  },

  profileImage: {
    type: String,
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },

  location: {
    type: String, // Mumbai, India
  },

  resumeUrl: {
    type: String, // download CV
  },

  skills: [
    {
      type: String, // SEO, Meta Ads, Content Marketing
    }
  ],

  tools: [
    {
      type: String, // Canva, Google Analytics, SEMrush
    }
  ],

  highlights: [
    {
      label: String,  // "Projects Completed"
      value: String,  // "25+"
    }
  ],

  socialLinks: [
    {
      platform: String, // LinkedIn, Instagram
      url: String,
    }
  ],

  experienceYears: {
    type: Number,
  },

  isAvailableForWork: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

export default mongoose.model("About", aboutSchema);