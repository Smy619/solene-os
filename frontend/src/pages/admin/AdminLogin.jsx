import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      localStorage.setItem("solene_admin_token", data.token);
      navigate("/admin");

    } catch (error) {
      console.error(error);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card" data-color-mode="light">
        <div className="admin-login-header">
          <div className="login-icon">🔐</div>
          <h2>Admin Login</h2>
          <p className="login-sub">Restricted area — Authorized personnel only</p>
        </div>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-login-input"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input"
          />

          <button className="admin-login-btn" type="submit">
            Login
          </button>
        </form>

        {error && <p className="admin-login-error">{error}</p>}
      </div>
    </div>
  );
}
