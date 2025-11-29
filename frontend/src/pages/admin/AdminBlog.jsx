import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog list
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div title="Blog Manager">
      <div className="admin-blog-page">

        {/* --- Create New Article Button --- */}
        <div className="admin-top-bar">
          <Link className="admin-btn" to="/admin/editor">
            + Create New Blog
          </Link>
        </div>

        {/* --- Blog List Table --- */}
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((post) => (
                <tr key={post.id}>
                  <td>
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>{post.title}</td>

                  <td>
                    <Link>{new Date(post.createdAt).toLocaleDateString("en-US")}</Link>
                  </td>

                  <td>
                    <Link className="admin-link" to={`/blog/${post.id}`}>
                      View
                    </Link>

                    {/* Future: Edit */}
                    <span className="admin-disabled">Edit</span>

                    {/* Future: Delete */}
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
