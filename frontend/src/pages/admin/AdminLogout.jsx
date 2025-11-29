import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("solene_admin_token");
    navigate("/admin/login");
  }, []);

  return null;
}
