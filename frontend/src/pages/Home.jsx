import React from "react";
import LogoS from "@assets/img/logo-os.svg";
import NotesIcon from "@assets/icons/notesicon.svg";
import BlogIcon from "@assets/icons/blog.svg";
import ProjectsIcon from "@assets/icons/projects.svg";
import StudioIcon from "@assets/icons/studio.svg";
import ShopIcon from "@assets/icons/shop.svg";
import AIToolsIcon from "@assets/icons/aitools.svg";
import OSLogo from "../components/OSLogo";


import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="os-container">
      {/* Floating Logo */}
      <div className="os-logo-card">
        <OSLogo src={LogoS} size={96} />
      </div>

      {/* Main Card */}
      <div className="os-main-card">
        {/* TEXT BLOCK */}
        <div className="os-text-block">
          <h1 className="os-title">Solene Dev Studio</h1>

          <p className="os-subtitle">
            Structure–Oriented Front-End Architect (React)
          </p>

          <p className="os-tag">Solene OS — Modular. Structured. Scalable.</p>
        </div>

        {/* APP GRID */}
        <div className="os-app-grid">
          <Link to="/studio" className="os-app">
            <img src={StudioIcon} alt="Studio" />
            <span>Studio</span>
          </Link>

          <Link to="/projects" className="os-app">
            <img src={ProjectsIcon} alt="Projects" />
            <span>Projects</span>
          </Link>

          <Link to="/blog" className="os-app">
            <img src={BlogIcon} alt="Blog" />
            <span>Blog</span>
          </Link>

          <Link to="/shop" className="os-app">
            <img src={ShopIcon} alt="Shop" />
            <span>Shop</span>
          </Link>

          <Link to="/notes" className="os-app">
            <img src={NotesIcon} alt="Notes" />
            <span>Notes</span>
          </Link>

          <Link to="/tools" className="os-app">
            <img src={AIToolsIcon} alt="AI Tools" />
            <span>AI Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
