import React from "react";
import AppPage from "../components/AppPage";

export default function Contact() {
  return (
    <AppPage hideHeader>

      <div className="contact-grid">
        
        {/* LEFT — FORM */}
        <div className="contact-card form-card">
          <h2 className="contact-card-title">Send a Message</h2>
          <p className="contact-card-sub">
            I reply within 24 hours — usually much faster.
          </p>

          <form className="contact-form">
            <div className="contact-two-col">
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
            </div>

            <input type="email" placeholder="Email address" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your message..." rows="5"></textarea>

            <button className="contact-btn">Send Message</button>
          </form>
        </div>

        {/* RIGHT — INFO */}
        <div className="contact-card info-card">
          <h2 className="contact-card-title">Chat with me</h2>

          <div className="contact-info-block">
            <p className="info-label">WhatsApp</p>
            <a href="https://wa.me/33612345678" target="_blank">@Solene dev studio</a>
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

