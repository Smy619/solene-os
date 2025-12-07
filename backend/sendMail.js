const nodemailer = require("nodemailer");

async function sendMail({ firstName, lastName, email, subject, message }) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER, 
      pass: process.env.BREVO_API_KEY,
    },
  });

  await transporter.sendMail({
    from: '"Solene Dev Studio" <contact@solenesun.com>',
    to: "contact@solenesun.com",
    replyTo: email,
    subject: subject || "New message from Solene-OS",
    html: `
      <h2>New message from your website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  return true;
}

module.exports = sendMail;

