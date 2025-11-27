import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();

  // cek apakah route aktif adalah bagian dari submenu Master Data
  const isMasterActive =
    location.pathname.startsWith("/admin/users") ||
    location.pathname.startsWith("/admin/pegawai");

  const [openMaster, setOpenMaster] = useState(false);

  // buka submenu jika route cocok
  useEffect(() => {
    if (isMasterActive) {
      setOpenMaster(true);
    }
  }, [isMasterActive]);

  return (
    <div
      className="flex-shrink-0 p-3 text-white d-flex flex-column bg-dark"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Brand */}
      <NavLink
        to="/admin"
        className="mb-3 text-white d-flex align-items-center mb-md-0 me-md-auto text-decoration-none"
      >
        <i className="bi bi-box-seam fs-4 me-2"></i>
        <span className="fs-4">Admin Panel</span>
      </NavLink>

      <hr />

      {/* Navigation Menu */}
      <ul className="mb-auto nav nav-pills flex-column">
        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        {/* Master Data (Dropdown) */}
        <li className="nav-item">
          <div
            className={`nav-link d-flex justify-content-between align-items-center ${
              isMasterActive ? "active" : "text-white"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenMaster(!openMaster)}
          >
            <span>
              <i className="bi bi-folder me-2"></i>
              Master Data
            </span>
            <i
              className={`bi ${
                openMaster ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            />
          </div>

          {openMaster && (
            <ul className="ms-4 mt-1 list-unstyled">
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-people me-2"></i>
                  User Management
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/pegawai"
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-person-badge me-2"></i>
                  Master Pegawai
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Products */}
        <li>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-box me-2"></i>
            Products
          </NavLink>
        </li>

        {/* Orders */}
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-cart me-2"></i>
            Orders
          </NavLink>
        </li>

        {/* Settings */}
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>
      </ul>

      <hr />
    </div>
  );
};

export default Sidebar;
