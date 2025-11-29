import React from "react";
import OSHeader from "@components/OSHeader";
import Dock from "@components/Dock";
import FooterCopyright from "../components/FooterCopyright";

export default function SoleneOS({ children }) {
  return (
    <div className="os-app-layout">
      <OSHeader />

      <main className="os-screen">
        {children}
      </main>

      <Dock />
      <FooterCopyright />
    </div>
  );
}




