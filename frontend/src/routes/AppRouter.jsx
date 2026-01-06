import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home.jsx";
import Studio from "@pages/Studio.jsx";
import Projects from "@pages/Projects.jsx";
import Shop from "@pages/Shop.jsx";
import Contact from "@pages/Contact.jsx";
import Notes from "@pages/Notes.jsx";
import Blog from "@pages/Blog.jsx";
import AITools from "@pages/AITools.jsx";
import AdminLogin from "@pages/admin/AdminLogin.jsx";
import AdminLogout from "@pages/admin/AdminLogout.jsx";
import AdminDashboard from "@pages/admin/AdminDashboard.jsx";
import AdminBlog from "@pages/admin/AdminBlog.jsx";
import AdminNotes from "@pages/admin/AdminNotes.jsx";
import AdminEditor from "@pages/admin/AdminEditor.jsx";
import BlogDetail from "@pages/BlogDetail.jsx";
import AdminRoute from "@components/AdminRoute.jsx";
import Settings from "../pages/Settings";

import HomeLayout from "../layout/HomeLayout";
import SoleneOS from "../layout/SoleneOs";
import AdminLayout from "../layout/AdminLayout";

export default function AppRouter() {
  return (
    <Routes>

      {/* ===========================
          PUBLIC PAGES
      ============================== */}
      <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />

      <Route path="/studio" element={<SoleneOS><Studio /></SoleneOS>} />
      <Route path="/projects" element={<SoleneOS><Projects /></SoleneOS>} />
      <Route path="/shop" element={<SoleneOS><Shop /></SoleneOS>} />
      <Route path="/contact" element={<SoleneOS><Contact /></SoleneOS>} />
      <Route path="/settings" element={<SoleneOS><Settings /></SoleneOS>} />
      <Route path="/tools" element={<SoleneOS><AITools /></SoleneOS>} />

      {/* BLOG / NOTES */}
      <Route path="/blog" element={<SoleneOS><Blog /></SoleneOS>} />
      <Route path="/blog/:id" element={<SoleneOS><BlogDetail /></SoleneOS>} />
      <Route path="/notes" element={<SoleneOS><Notes /></SoleneOS>} />

      {/* ===========================
          ADMIN LOGIN/LOGOUT
      ============================== */}
      <Route path="/admin/login" element={<SoleneOS><AdminLogin /></SoleneOS>} />
      <Route path="/admin/logout" element={<SoleneOS><AdminLogout /></SoleneOS>} />

      {/* ===========================
          PROTECTED ADMIN ROUTES
      ============================== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/notes"
        element={
          <AdminRoute>
            <AdminLayout><AdminNotes /></AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/blog"
        element={
          <AdminRoute>
            <AdminLayout><AdminBlog /></AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/editor"
        element={
          <AdminRoute>
            <AdminLayout><AdminEditor /></AdminLayout>
          </AdminRoute>
        }
      />

    </Routes>
  );
}
