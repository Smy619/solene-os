const SibApiV3Sdk = require("sib-api-v3-sdk");

async function sendMail(form) {
  const { firstName, lastName, email, subject, message } = form;

  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

  const api = new SibApiV3Sdk.TransactionalEmailsApi();

  try {
    await api.sendTransacEmail({
      sender: {
        name: "Solene Dev Studio",
        email: "contact@solenesun.com",
      },
      to: [{ email: "contact@solenesun.com" }],
      replyTo: { email },
      subject: subject || "New message from Solene-Sun Website",
      htmlContent: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("🟢 Email sent successfully via Brevo API");
    return { success: true };
  } catch (err) {
    console.error("🔴 Brevo API Error:", err);
    return { success: false, error: err };
  }
}

module.exports = sendMail;
