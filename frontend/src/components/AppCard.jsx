export default function AppCard({ title, description, tag, status, icon }) {
  return (
    <article className="app-card">

      {/* Top Row: Tag + Status */}
      <div className="app-card-top">
        {tag && <span className="app-card-tag">{tag}</span>}
        {status && <span className="app-card-status">{status}</span>}
      </div>

      {/* Icon */}
      {icon && <div className="app-card-icon">{icon}</div>}

      {/* Title */}
      <h2 className="app-card-title">{title}</h2>

      {/* Description */}
      <p className="app-card-description">{description}</p>

      {/* Footer (optional) */}
      <div className="app-card-footer">
        <button className="app-card-btn" disabled>
          Not available yet
        </button>
      </div>
    </article>
  );
}
