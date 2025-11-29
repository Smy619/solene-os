import React from "react";
import BaseCard from "@components/BaseCard";

export default function About() {
  return (
    <BaseCard className="about-card">
      {/* About Me */}
      <section className="about-section">
        <h2 className="about-section-title">About Me</h2>
        <p>
          I am a structure-oriented front-end architect specialized in React,
          design-system integration, and maintainable UI engineering. My mission
          is to transform ideas into clean, stable, and well-designed digital
          products.
        </p>
      </section>

      {/* What I Build */}
      <section className="about-section">
        <h2 className="about-section-title">What I Build</h2>
        <p>
          I build frontend architectures, scalable UI systems, and refined user
          experiences. My work focuses on clarity, modularity, and long-term
          maintainability — turning complexity into simple, elegant solutions.
        </p>
      </section>

      {/* Craft Philosophy */}
      <section className="about-section">
        <h2 className="about-section-title">Craft Philosophy</h2>
        <p>
          Code is not only about functionality — it is about structure. I
          believe clean architecture is the foundation of every successful
          project: predictable, scalable, and future-proof. This is the core
          principle behind Solene Dev Studio.
        </p>
      </section>

      {/* My Workflow */}
      <section className="about-section">
        <h2 className="about-section-title">My Workflow</h2>
        <ul className="about-list">
          <li>Understand the project deeply — structure before pixels.</li>
          <li>Design a stable component architecture.</li>
          <li>Build responsive, accessible, maintainable UI.</li>
          <li>Integrate backend APIs or create full-stack systems.</li>
          <li>Deliver clean, documented, production-ready code.</li>
        </ul>
      </section>
    </BaseCard>
  );
}
