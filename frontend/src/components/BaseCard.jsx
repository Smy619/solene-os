import React from "react";

/**
 * BaseCard — Apple-style unified outer card shell
 * All card components (ProjectCard, ServiceCard, ToolCard...) reuse this structure.
 */
export default function BaseCard({ children, className = "" }) {
  return <div className={`base-card ${className}`}>{children}</div>;
}
