import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
    });

    // Notify shailesh about the new message
    try {
      await sendEmail({
        email: process.env.SMTP_USER, // Send to the admin email
        subject: `New Portfolio Message from ${name}`,
        message: `You received a new message from ${name} (${email}, ${phone || 'no phone'}): \n\n ${message}`,
        html: `
          <h3>New Portfolio Message!</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 10px; border-left: 5px solid #2563eb;">${message}</blockquote>
        `,
      });
    } catch (err) {
      console.error("Failed to send notification email:", err.message);
      // We don't throw error here to not break the user's response
    }

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Admin (to be protected later)
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort("-createdAt");
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Admin (to be protected later)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
