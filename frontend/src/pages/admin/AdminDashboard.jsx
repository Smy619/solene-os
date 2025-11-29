import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  NotebookTabs,
  Edit3,
  LogOut,
  Activity,
  User,
  ShieldCheck,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("solene_admin_token");

   
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${API_URL}/api/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]));

    // Fetch Notes
    fetch(`${API_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotes(Array.isArray(data) ? data : []))
      .catch(() => setNotes([]));
  }, [navigate]);

  const totalPosts = blogs.length;
  const totalNotes = notes.length;

  return (
    <div className="admin-dashboard">

      <header className="admin-topbar">
        <div>
          <h1>Solene-OS Admin</h1>
          <p>Quiet control center for your Studio content.</p>
        </div>

        <div className="admin-topbar-right">
          <div className="admin-topbar-user">
            <div className="avatar-circle">S</div>
            <div className="admin-topbar-user-info">
              <span className="name">Solène Sun</span>
              <span className="role">Owner · Structure-Oriented Dev</span>
            </div>
          </div>
        </div>
      </header>

  
      <section className="admin-stats-grid">
        <div className="admin-stat-card primary">
          <div className="icon-wrap">
            <FileText size={22} />
          </div>
          <div className="stat-main">
            <span className="label">Blog posts</span>
            <span className="value">{totalPosts}</span>
          </div>
          <span className="hint">Published & draft entries</span>
        </div>

        <div className="admin-stat-card">
          <div className="icon-wrap">
            <NotebookTabs size={22} />
          </div>
          <div className="stat-main">
            <span className="label">Notes</span>
            <span className="value">{totalNotes}</span>
          </div>
          <span className="hint">Private studio notes</span>
        </div>

        <div className="admin-stat-card">
          <div className="icon-wrap">
            <User size={22} />
          </div>
          <div className="stat-main">
            <span className="label">Admin</span>
            <span className="value">1</span>
          </div>
          <span className="hint">You are the only one 👑</span>
        </div>

        <div className="admin-stat-card">
          <div className="icon-wrap">
            <Activity size={22} />
          </div>
          <div className="stat-main">
            <span className="label">System status</span>
            <span className="value ok">OK</span>
          </div>
          <span className="hint">Backend & JSON storage online</span>
        </div>
      </section>

   
      <section className="admin-quick-row">
        <h2>Quick actions</h2>
        <div className="admin-quick-actions">
          <Link to="/admin/editor" className="admin-quick-btn">
            <Edit3 size={18} />
            <div>
              <span className="title">New post</span>
              <span className="desc">Open the editor and start writing</span>
            </div>
          </Link>

          <Link to="/admin/blog" className="admin-quick-btn">
            <FileText size={18} />
            <div>
              <span className="title">Manage blog</span>
              <span className="desc">Edit, update or remove posts</span>
            </div>
          </Link>

          <Link to="/admin/notes" className="admin-quick-btn">
            <NotebookTabs size={18} />
            <div>
              <span className="title">Manage notes</span>
              <span className="desc">Curate your internal notes</span>
            </div>
          </Link>

         
        </div>
      </section>

      <section className="admin-latest-grid">
        <div className="admin-panel">
          <div className="panel-header">
            <span>Latest blog posts</span>
            <span className="panel-badge">
              <ShieldCheck size={14} /> Public
            </span>
          </div>

          <div className="panel-body">
            {blogs.slice(0, 5).map((b) => (
              <div className="admin-latest-item" key={b.id}>
                <span className="title">{b.title}</span>
                <Link
                  to={`/admin/editor?id=${b.id}`}
                  className="admin-link subtle"
                >
                  Edit
                </Link>
              </div>
            ))}

            {blogs.length === 0 && (
              <p className="admin-empty">No blog posts yet. Start with “New post”.</p>
            )}
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-header">
            <span>Latest notes</span>
            <span className="panel-badge soft">Private</span>
          </div>

          <div className="panel-body">
            {notes.slice(0, 5).map((n) => (
              <div className="admin-latest-item" key={n.id}>
                <span className="title">
                  {n.title || n.content.slice(0, 40) + "..."}
                </span>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="admin-empty">
                No notes yet. Capture your ideas in the Notes section.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
