import React from "react";
import AppPage from "@components/AppPage";
import notes from "@data/notes.json";


export default function Notes() {
  return (
    <AppPage title="Notes" icon={null}>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-date">{note.date}</div>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-excerpt">{note.excerpt}</p>
          </div>
        ))}
      </div>
    </AppPage>
  );
}
