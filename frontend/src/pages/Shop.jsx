import AppPage from "@components/AppPage";
import AppCard from "@components/AppCard";
import products from "@data/shop.json";
import pricing from "@data/pricing.json";
import PricingCard from "@components/PricingCard";
import SectionHeader from "../components/SectionHeader";



export default function Shop() {
  return (
    <AppPage hideHeader>
       {/* Pricing Section */}
      <SectionHeader
        title="Pricing & Services"
        subtitle="Transparent, project-based pricing — clear scope, clear timeline, no surprises."
      />
      {/* Pricing Section */}
      <div className="app-grid">
        {pricing.map((item) => (
          <PricingCard
            key={item.id}
            name={item.name}
            tag={item.tag}
            icon={item.icon}
            description={item.description}
            process={item.process}
            delivery={item.delivery}
            timeline={item.timeline}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="section-divider"></div>

        {/* Ready-made Projects */}
      <SectionHeader
        title="Ready-Made Templates & Digital Products"
        subtitle="Pre-built themes, boilerplates, and AI tools — perfect for instant setup or client demos."
      />

      <div className="app-grid">
        {products.map((item) => (
          <AppCard
            key={item.id}
            title={item.name}
            description={item.description}
            tag={item.tag}
            status={item.status}
            icon={
              item.icon ? <img src={item.icon} alt={item.name} /> : null
            }
          />
        ))}
      </div>
    </AppPage>
  );
}




