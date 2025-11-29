import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes list
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch(`${API_URL}/api/notes`);
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Error loading notes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div title="Notes Manager">
      <div className="admin-notes-page">

        {/* Create New Note */}
        <div className="admin-top-bar">
          <Link className="admin-btn" to="/admin/editor">
            + Create New Note
          </Link>
        </div>

        {/* Notes List */}
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((note) => (
                <tr key={note.id}>
                  <td>{note.title || "(No title)"}</td>

                  <td>
                    <Link>{new Date(note.createdAt).toLocaleDateString("en-US")}</Link>
                  </td>

                  <td>
                    {/* Future: View Note */}
                    <span className="admin-disabled">View</span>

                    {/* Future: Edit Note */}
                    <span className="admin-disabled">Edit</span>

                    {/* Future: Delete Note */}
                    <span className="admin-disabled">Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
