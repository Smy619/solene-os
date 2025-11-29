import { useEffect } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@assets/icons/email.svg";
import GithubIcon from "@assets/icons/github.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import ContactIcon from "@assets/icons/contact.svg";

export default function Dock() {
  const apps = [
    { name: "Email", icon: EmailIcon, path: "/contact" },
    {
      name: "GitHub",
      icon: GithubIcon,
      path: "https://github.com/Smy619",
      external: true,
    },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
    { name: "Contact", icon: ContactIcon, path: "/contact" },
  ];

useEffect(() => {
  const icons = document.querySelectorAll(".dock-icon");
  const dock = document.querySelector(".os-dock");
  let lastScrollY = window.scrollY;

  /* ===========================
        1) Dock Scale Effect
     =========================== */
  const handleMove = (e) => {
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - centerX);

      let scale = 1;
      if (distance < 40) scale = 1.35;
      else if (distance < 90) scale = 1.1;

      icon.style.transform = `scale(${scale})`;
    });
  };

  const resetScale = () => {
    icons.forEach((icon) => {
      icon.style.transform = "scale(1)";
    });
  };

  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseleave", resetScale);


  /* ===========================
        2) Dock Auto-Hide Scroll
     =========================== */
  const handleScroll = () => {
    if (!dock) return;
    const currentY = window.scrollY;

    if (currentY > lastScrollY + 5) {
      dock.classList.add("dock-hidden");    // Hide
    } else if (currentY < lastScrollY - 5) {
      dock.classList.remove("dock-hidden"); // Show
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", handleScroll);


  /* ===========================
        Cleanup — ONE return
     =========================== */
  return () => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseleave", resetScale);
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="os-dock">
      {apps.map((app) =>
        app.external ? (
          <a
            key={app.name}
            href={app.path}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-icon"
          >
            <img src={app.icon} alt={app.name} />
          </a>
        ) : (
          <Link key={app.name} to={app.path} className="dock-icon">
            <img src={app.icon} alt={app.name} />
          </Link>
        )
      )}
    </div>
  );
}
