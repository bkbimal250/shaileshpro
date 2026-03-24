import transporter from "../config/mail.js";

/**
 * Send an email asynchronously.
 * @param {Object} options Options like { email, subject, message, html }
 */
const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: %s`, info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
