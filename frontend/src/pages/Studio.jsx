import React from "react";
import AppPage from "@components/AppPage";
import ServiceCard from "@components/ServiceCard";
import services from "@data/services.json";
import iconMap from "@utils/iconMap";
import AboutMeCard from "../components/AboutMeCard";

export default function Studio() {
  return (
    <AppPage hideHeader>
      <AboutMeCard />

      <div className="studio-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            tags={service.tags}
            icon={iconMap[service.icon]}
          />
        ))}
      </div>
    </AppPage>
  );
}
