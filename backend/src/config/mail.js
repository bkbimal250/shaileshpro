import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    console.log("SMTP Server is ready to take our messages");
  } catch (error) {
    console.error("SMTP Connection Error:", error.message);
  }
};

export default transporter;
