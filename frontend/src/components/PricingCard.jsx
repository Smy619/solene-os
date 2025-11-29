import React from "react";
import BaseCard from "./BaseCard";
import iconMap from "@utils/iconMap";

export default function PricingCard({
  name,
  tag,
  description,
  process,
  delivery,
  timeline,
  icon,
}) {
  return (
    <BaseCard className="pricing-card">
      <div className="pricing-card-header">
        <div className="pricing-card-icon">{iconMap[icon]}</div>
        <h3 className="pricing-card-title">{name}</h3>
      </div>

      <p className="pricing-card-description">{description}</p>

      <div className="pricing-card-price">{tag}</div>

      <div className="pricing-section">
        <h4>Process</h4>
        <ul>
          {process.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="pricing-section">
        <h4>Delivery</h4>
        <ul>
          {delivery.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="pricing-section timeline">
        <strong>Timeline:</strong> {timeline}
      </div>

      <a href="/pricing#details" className="pricing-btn">
        View Full Details
      </a>
    </BaseCard>
  );
}
