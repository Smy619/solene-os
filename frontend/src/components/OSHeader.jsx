import { useEffect } from "react";
import OSLogo from "./OSLogo";
import { Link } from "react-router-dom";

export default function OSHeader() {
  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const header = document.querySelector(".os-header");
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 40) {
  
        header.classList.add("os-header-hidden");
      } else {

        header.classList.remove("os-header-hidden");
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="os-header">
      <div className="os-header-left">
        <OSLogo size={22} />
        <Link to="/" className="os-header-title">
          Solene OS
        </Link>
      </div>

      <div className="os-header-right">
        <span className="os-time">{now}</span>
      </div>
    </header>
  );
}



