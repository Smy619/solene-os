import { Link} from "react-router-dom";
import { LayoutDashboard, FileText, StickyNote, LogOut } from "lucide-react";

export default function AdminLayout({ children }) {
   // ==========================
  //  Navigation Items (You were missing this)
  // ==========================
  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "Manage Blog",
      icon: FileText,
      path: "/admin/blog",
    },
    {
      label: "Manage Notes",
      icon: StickyNote,
      path: "/admin/notes",
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-header">
          <div className="admin-avatar">S</div>
          <div>
            <div className="admin-name">Solène Sun</div>
            <div className="admin-role">Administrator</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.path} to={item.path} className="admin-nav-item">
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="admin-logout-section">
          <Link to="/admin/logout" className="admin-nav-item logout">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
