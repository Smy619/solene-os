import React from "react";

/**
 * AppPage — Unified Layout for every App (Studio, Projects, Blog, Notes, Shop, AI Tools)
 * iPadOS Split View Style
 */

export default function AppPage({ title, icon, actions, hideHeader = false, children }) {
  return (
    <div className="app-page">

      {/* -------------------------
          Header
      -------------------------- */}
      {!hideHeader && (
        <header className="app-header">
          <div className="app-header-left">
            {icon && <div className="app-icon">{icon}</div>}
            {title && <h1 className="app-title">{title}</h1>}
          </div>

          {actions && (
            <div className="app-header-right">
              {actions}
            </div>
          )}
        </header>
      )}

      <div className="app-content">{children}</div>
    </div>
  );
}


