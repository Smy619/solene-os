import React, { useState } from "react";
import AppPage from "../components/AppPage";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(""); 
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error");

      setStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });

  
      setTimeout(() => setStatus(""), 3000);

    // eslint-disable-next-line no-unused-vars
    } catch (_error){
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <AppPage hideHeader>
      <div className="contact-grid">
        {/* LEFT — FORM */}
        <div className="contact-card form-card">
          <h2 className="contact-card-title">Send a Message</h2>
          <p className="contact-card-sub">I reply within 24 hours — usually faster.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-two-col">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your message..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button className="contact-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="contact-success">Message sent ✔</p>
            )}
            {status === "error" && (
              <p className="contact-error">Error sending message ❌</p>
            )}
          </form>
        </div>

        {/* RIGHT — INFO */}
        <div className="contact-card info-card">
          <h2 className="contact-card-title">Chat with me</h2>

          <div className="contact-info-block">
            <p className="info-label">WhatsApp</p>
            <a href="https://wa.me/33612345678" target="_blank">
              @Solene dev studio
            </a>
          </div>

          <div className="contact-info-block">
            <p className="info-label">Email</p>
            <a href="mailto:contact@solenesun.com">contact@solenesun.com</a>
          </div>

          <div className="contact-info-block">
            <p className="info-label">Location</p>
            <span>Vendée, France</span>
          </div>
        </div>
      </div>
    </AppPage>
  );
}

