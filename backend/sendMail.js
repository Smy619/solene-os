const axios = require("axios");

async function sendMail(form) {
  const { firstName, lastName, email, subject, message } = form;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Solene Dev Studio",
          email: "contact@solenesun.com",
        },
        to: [
          {
            email: "contact@solenesun.com",
            name: "Solene Dev Studio",
          },
        ],
        replyTo: {
          email: email,
          name: `${firstName} ${lastName}`,
        },
        subject: subject || "New message from Solene-Sun Website",
        htmlContent: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        timeout: 10000, //
    );

    console.log("🟢 Email sent via Brevo API:", response.data);
    return { success: true };

  } catch (error) {
    console.error(
      "🔴 Brevo API Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

module.exports = sendMail;
