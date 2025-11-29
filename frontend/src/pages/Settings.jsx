import React from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="settings-page">
      {/* ----------------------------
            Section 1 — General
        ----------------------------- */}
      <div className="settings-section">
        <h2 className="settings-section-title">General</h2>

        <Link to="/appearance" className="settings-item">
          <span>Appearance</span>
          <span className="settings-arrow">›</span>
        </Link>
      </div>

      {/* ----------------------------
            Section 2 — Admin (Protected)
        ----------------------------- */}
      <div className="settings-section">
        <h2 className="settings-section-title">Admin</h2>

        <Link to="/admin" className="settings-item">
          <span>Login</span>
          <span className="settings-arrow">›</span>
        </Link>
      </div>

      {/* ----------------------------
            Section 3 — About SoleneOS
        ----------------------------- */}
      <div className="settings-section">
        <h2 className="settings-section-title">About SoleneOS</h2>
        <a 
          href="/cv/Cv Ting Sun En.pdf" 
          download 
          className="settings-item"
         >
          <span>Download CV</span>
          <span className="settings-arrow">›</span>
       </a>

        <div className="settings-item no-link">
          <span>Version</span>
          <span>1.0.0</span>
        </div>

        <div className="settings-item no-link">
          <span>Developer</span>
          <span>Solène Sun</span>
        </div>
       
        
     </div>
    </div>
  );
}
