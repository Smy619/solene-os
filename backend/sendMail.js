const nodemailer = require("nodemailer");

async function sendMail(form) {
  const { firstName, lastName, email, subject, message } = form;

  try {
    // 1. Create SMTP Transporter using Brevo
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact@solenesun.com", // Your verified Brevo sender
        pass: process.env.BREVO_SMTP_KEY, // Your SMTP key stored in Render
      },
    });

    // 2. Prepare email content
    const mailOptions = {
      from: `"Solene Dev Studio" <contact@solenesun.com>`,
      to: "contact@solenesun.com",    // Where the message will arrive
      replyTo: email,                 // Allows you to reply directly to the user
      subject: subject || "New message from Solene-Sun Website",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    console.log("🟢 Email sent successfully via SMTP!");
    return { success: true };

  } catch (err) {
    console.error("🔴 SMTP Error:", err);
    return { success: false, error: err };
  }
}

module.exports = sendMail;
