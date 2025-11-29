import React from "react";
import BaseCard from "./BaseCard";

export default function ServiceCard({ icon, title, description, tags }) {
  return (
    <BaseCard className="service-card">
      <div className="service-card-header">
        {icon && <div className="service-card-icon">{icon}</div>}
        <h3 className="service-card-title">{title}</h3>
      </div>

      <p className="service-card-description">{description}</p>

      <div className="service-card-tags">
        {tags?.map((tag, index) => (
          <span key={index} className="service-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="service-card-buttons service-card-buttons-top">
        <a href="/shop" className="service-btn service-btn--pricing">
          View Pricing
        </a>
      </div>

      <div className="service-card-buttons">
        <a
          href="https://wa.me/33601228447?text=Hi%20Solene%2C%20I'm%20interested%20in%20your%20development%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="service-btn service-btn--whatsapp"
        >
          WhatsApp
        </a>

        <a
          href="mailto:contact@solenesun.com"
          className="service-btn service-btn--email"
        >
          Email
        </a>
      </div>
    </BaseCard>
  );
}
