import logo from "../assets/images/kf.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-light shadow p-3 mb-2 bg-body-tertiary rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="KFA-Logo"
              width="180"
              height="60"
              className="d-inline-block align-text-top"
            ></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  BERANDA
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TENTNG KAMI
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  PRODUK & LAYANAN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  OUTLET
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  KEBERLANJUTAN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  BERITA
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  KARIR
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  KONTAK
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  ID
                </a>
              </li>
            </ul>
            <button
              className="btn ms-auto"
              style={{
                backgroundColor: "var(--primaryAccent)",
                color: "white",
              }}
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
