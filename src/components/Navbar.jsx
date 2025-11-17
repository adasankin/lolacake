import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(readUser());

  useEffect(() => {
    setUser(readUser());
  }, [location.pathname]);

  useEffect(() => {
    const onStorage = () => setUser(readUser());
    const onAuthChanged = () => setUser(readUser());
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg lola-navbar bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/assets/navbar-brand.png" alt="logo" width="120" height="50" style={{ borderRadius: 8 }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-dark" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/product">Product</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/about-us">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/contact">Contact</Link></li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/keranjang" className="btn btn-sm btn-outline-dark rounded-pill">Cart</Link>

            {/* === Auth area === */}
            {!user ? (
              <Link to="/login" className="btn btn-sm btn-warning rounded-pill px-3">
                Login / Sign Up
              </Link>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-light rounded-pill dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Hello, {user.username || "User"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
