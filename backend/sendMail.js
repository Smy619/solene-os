const SibApiV3Sdk = require("sib-api-v3-sdk");

async function sendMail(form) {
  const { firstName, lastName, email, subject, message } = form;

  // Initialize Brevo client
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

  const api = new SibApiV3Sdk.TransactionalEmailsApi();

  await api.sendTransacEmail({
    sender: { 
      name: "Solene Dev Studio", 
      email: "contact@solenesun.com" 
    },
    to: [{ email: "contact@solenesun.com" }], // your mailbox
    replyTo: { email }, // reply-to user's email
    subject: subject || "New message from Solene-OS",
    htmlContent: `
      <h2>New message from your website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}

module.exports = sendMail;
