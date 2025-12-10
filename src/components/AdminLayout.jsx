import { Link, Outlet, useNavigate } from "react-router-dom";


const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">MDKC Admin</h2>

        <nav className="admin-nav">
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/messages">📩 Messages</Link>
          <Link to="/admin/programs">📌 Services</Link>
          <Link to="/admin/destinations">🌍 Destinations</Link>
          <Link to="/admin/testimonials">⭐ Testimonials</Link>

          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </nav>
      </aside>

      {/* ===== PAGE CONTENT ===== */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
