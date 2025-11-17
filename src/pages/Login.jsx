import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { api, saveAuth } from "../lib/api";
import { parseAuthError } from "../lib/auth-errors";

import logo_lolacake from "../assets/loginpage/logo-lolacake.png";
import loginhero from "../assets/loginpage/login-hero.png";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false });

  const showPopup = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (state?.justRegistered) {
      showPopup({
        type: "success",
        message: "Akun berhasil dibuat! Silakan login.",
        okText: "OK",
        onOk: closePopup,
      });
    }
  }, [state]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return showPopup({
        type: "error",
        message: "Email dan password wajib diisi.",
        okText: "Periksa",
        onOk: closePopup,
      });
    }

    setLoading(true);
    try {
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });
      saveAuth({ token: res.token, user: res.user });
      navigate("/");
    } catch (err) {
      const p = parseAuthError(err);
      showPopup({ ...p, okText: "Periksa", onOk: closePopup });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="row g-0 align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* LEFT — LOGIN FORM */}
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <div style={{ maxWidth: 520 }} className="w-100 p-4 p-md-5">
            <div className="text-end mb-3">
              <img
                src={logo_lolacake}
                alt="Lola Cake logo"
                style={{width: 150, marginRight: "-50px" }}
              />
            </div>

            <div
              className="p-4 p-md-5 shadow"
              style={{
                background: "#fdecb6",
                borderRadius: 22,
              }}
            >
              <h1
                className="fw-bold text-center"
                style={{ color: "#3d231d", fontSize: 48 }}
              >
                Welcome!
              </h1>

              <p className="text-center text-muted mb-4">
                Enter your email / mobile number and password to login
              </p>

              <form onSubmit={onSubmit}>
                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label small">
                    Username or Email*
                  </label>
                  <input
                    name="email"
                    className="form-control form-control-lg"
                    style={{ borderRadius: 12 }}
                    onChange={onChange}
                    value={form.email}
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-2">
                  <div className="d-flex justify-content-between small mb-1">
                    <label className="form-label">Password*</label>
                    <Link to="/auth/forgot">Forgot your password?</Link>
                  </div>

                  <div className="input-group">
                    <input
                      name="password"
                      className="form-control form-control-lg"
                      style={{ borderRadius: "12px" }}
                      onChange={onChange}
                      value={form.password}
                    />                    
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  className="btn w-100 mt-3"
                  style={{
                    background: "#f08b2d",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "10px 0",
                  }}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <p className="text-center mt-3 small">
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#f08b2d" }}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — HERO IMAGE */}
        <div className="text-end col-12 col-lg-6">
          <img
            src={loginhero}
            alt="login hero"
            className="img-fluid"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              marginRight: "-15px"
            }}
          />
        </div>
      </div>

      <Popup {...popup} />
    </div>
  );
}
