
import Dock from "@components/Dock";
import FooterCopyright from "../components/FooterCopyright";

export default function HomeLayout({ children }) {
  return (
    <div className="home-layout">
      <div className="home-screen">
        {children}
        <FooterCopyright />
      </div>
      <Dock />
      
    </div>
  );
}
