import AppPage from "@components/AppPage";
import AppCard from "@components/AppCard";
import data from "@data/aiTools.json";

export default function AITools() {
  return (
    <AppPage hideHeader>
      <div className="app-grid">
        {data.map((tool) => (
          <AppCard
            key={tool.id}
            title={tool.name}
            description={tool.description}
            tag={tool.tag}
            status={tool.status}
          />
        ))}
      </div>
    </AppPage>
  );
}
