import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const registerEmail = async (email) => {
  try {
    await connectDB();
    
    let user = await User.findOne({ email });
    
    if (user) {
      console.log(`User ${email} already registered.`);
    } else {
      user = await User.create({ email, isVerified: true });
      console.log(`User ${email} successfully registered as admin.`);
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Registration failed:", error.message);
    process.exit(1);
  }
};

const emailToRegister = process.argv[2] || "dos.bimal@gmail.com";
registerEmail(emailToRegister);
