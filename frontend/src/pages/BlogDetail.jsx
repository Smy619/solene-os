import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import AppPage from "@components/AppPage.jsx";

export default function BlogDetail() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        const data = await res.json();

        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, API_URL]);

  if (loading) return <AppPage title="Blog">Loading...</AppPage>;
  if (!blog) return <AppPage title="Blog">Not found.</AppPage>;

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AppPage title={blog.title}>
      <div className="blog-detail">
        <Link to="/blog" className="back-button">
          ← Back to Blog
        </Link>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="blog-detail-cover"
          />
        )}
        
        
        <div className="blog-detail-header">
          <div className="date">{formatDate(blog.createdAt)}</div>
          <h1 className="title">{blog.title}</h1>

          {/* Render markdown */}
          <div className="blog-detail-content">
            <MDEditor.Markdown source={blog.content} />
          </div>
        </div>
      </div>
    </AppPage>
  );
}
