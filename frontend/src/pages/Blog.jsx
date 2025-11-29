import { useEffect, useState }from "react";
import AppPage from "@components/AppPage";
import { Link } from "react-router-dom";



export default function Blog() {
    
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [API_URL]);
  
  // FIXED: missing return + missing closing bracket
  if (loading) {
    return (
      <AppPage title="Blog" icon={null}>
        <p>Loading blogs...</p>
      </AppPage>
    );
  }
 // ---- Helper: extract text & short preview ----
  const getExcerpt = (markdown) => {
    if (!markdown) return "";
    // remove markdown symbols (#, *, etc.)
    const text = markdown.replace(/[#_*>\-`]/g, "");
    return text.slice(0, 150) + "...";
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AppPage title="Blog" icon={null}>
      <div className="blog-list">
        {blogs.map((post) => (
          <div key={post.id} className="blog-card">
             {/* FIXED: coverImage instead of post.cover */}
            {post.coverImage && (
               <img
                src={post.coverImage}
                className="blog-cover"
                alt={post.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <div className="blog-info">
              {/* FIXED: createdAt instead of post.date */}
              <div className="blog-date">{formatDate(post.createdAt)}</div>
              <h3 className="blog-title">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
               {/* You don't have subtitle or excerpt yet in backend */}
             
              <p className="blog-excerpt">{getExcerpt(post.content)}</p>
            </div>
          </div>
        ))}
      </div>
    </AppPage>
  );
}

