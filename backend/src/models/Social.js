import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  platform: {
    type: String, // Instagram, LinkedIn, YouTube
    required: true,
  },

  handle: {
    type: String, // @brandname
  },

  profileUrl: {
    type: String,
  },

  logo: {
    type: String, // platform or brand logo
  },

  followers: {
    type: Number,
  },

  growth: {
    type: String, // "+15K in 3 months"
  },

  engagementRate: {
    type: String, // "5.2%"
  },

  niche: {
    type: String, // Spa, Fitness, Fashion
  },

  managed: {
    type: Boolean,
    default: true, // you handled this account
  },

  isPersonal: {
    type: Boolean,
    default: false, // your own account
  },

  highlights: [
    {
      label: String, // "Reach"
      value: String, // "500K/month"
    }
  ],

  topPosts: [
    {
      image: String,
      link: String,
      description: String,
    }
  ],

  campaignTypes: [
    {
      type: String, // Reels, Ads, Influencer Campaigns
    }
  ],

  toolsUsed: [
    {
      type: String, // Meta Ads, Canva, Buffer
    }
  ],

  isFeatured: {
    type: Boolean,
    default: false,
  },

  order: {
    type: Number,
  },

  isActive: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

export default mongoose.model("Social", socialSchema);