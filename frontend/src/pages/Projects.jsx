import React from "react";
import AppPage from "@components/AppPage";
import ProjectCard from "@components/ProjectCard";
import ProjectsIcon from "@assets/icons/projects.svg";
import projects from "@data/projects.json";
import "@styles/pages/_projects.scss";

export default function Projects() {
  return (
      <AppPage hideHeader>
    
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            demo={project.demo}
            github={project.github}
          />
        ))}
      </div>
    </AppPage>
  );
}
