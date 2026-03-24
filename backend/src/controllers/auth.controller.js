import User from "../models/User.js";
import OTP from "../models/OTP.js";
import generateOTP from "../utils/generateOTP.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email");
  }

  // Generate OTP
  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Delete previous OTPs for this email
  await OTP.deleteMany({ email });

  // Save core OTP in DB
  await OTP.create({
    email,
    otp: otpCode,
    expiresAt,
  });

  // Check if user exists, if not create them
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }

  // Send email with OTP
  const message = `Your Shailesh Portfolio Login OTP is: ${otpCode}. It is valid for 10 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">Shailesh Portfolio Login</h2>
      <p style="font-size: 16px; color: #555;">Hello,</p>
      <p style="font-size: 16px; color: #555;">Use the following OTP to complete your login. This OTP is valid for 10 minutes.</p>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${otpCode}</span>
      </div>
      <p style="font-size: 14px; color: #888; text-align: center;">If you did not request this OTP, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">© 2026 Shailesh Portfolio. All rights reserved.</p>
    </div>
  `;

  try {
    await sendEmail({
      email,
      subject: "Your Login OTP - Shailesh Portfolio",
      message,
      html,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
    });
  } catch (error) {
    console.error("Auth send-otp failed:", error.message);
    res.status(500);
    throw new Error("Email could not be sent. Please check SMTP settings.");
  }
});

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error("Please provide email and otp");
  }

  const otpData = await OTP.findOne({ email, otp });

  if (!otpData) {
    res.status(401);
    throw new Error("Invalid or expired OTP");
  }

  // Check if expired
  if (otpData.expiresAt < new Date()) {
    await OTP.deleteOne({ _id: otpData._id });
    res.status(401);
    throw new Error("OTP has expired");
  }

  // Get user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // OTP is valid, delete it
  await OTP.deleteOne({ _id: otpData._id });

  // Return user info and token
  res.status(200).json({
    success: true,
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Protected (to be used with protect middleware)
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});