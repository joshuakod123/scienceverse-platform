// server/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // For development, just log the email instead of sending
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 EMAIL WOULD BE SENT:');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Message:', options.message);
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USERNAME || 'your_username',
      pass: process.env.SMTP_PASSWORD || 'your_password'
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'ScienceVerse'} <${process.env.FROM_EMAIL || 'noreply@scienceverse.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;