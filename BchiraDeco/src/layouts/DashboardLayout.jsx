// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.scss";
import { FaBox, FaClipboardList, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>{t("dashboard_brand")}</h2>
        </div>
        <nav className="nav-links">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaTachometerAlt /> {t("dashboard_nav_orders")}
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaClipboardList /> {t("dashboard_nav_categories")}
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBox /> {t("dashboard_nav_products")}
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> {t("dashboard_logout")}
        </button>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
