import React from "react";
import BaseCard from "./BaseCard";

/**
 * ProjectCard — inside structure for each project
 * Reuses BaseCard for unified outer Apple-style shell.
 */
export default function ProjectCard({ title, description, image, tags, demo, github }) {
  return (
    <BaseCard className="project-card">

      {/* Project Screenshot */}
      {image && (
        <div className="project-card-image">
          <img src={image} alt={title} />
        </div>
      )}

      {/* Project Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>

        {/* Tags */}
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="project-card-buttons">
          <a href={demo} target="_blank" className="btn-demo">Live Demo</a>
          <a href={github} target="_blank" className="btn-github">GitHub</a>
        </div>
      </div>

    </BaseCard>
  );
}
