import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { api } from "../lib/api";
import { parseAuthError } from "../lib/auth-errors";
import logo_lolacake from "../assets/loginpage/logo-lolacake.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    okText: "OK",
    onOk: null,
  });

  const showPopup = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.name || !form.username || !form.phone || !form.email || !form.password) {
      return showPopup({
        type: "error",
        title: "Form tidak lengkap",
        message: "Semua field wajib diisi.",
        okText: "Periksa",
        onOk: closePopup,
      });
    }
    if (form.password !== form.confirm) {
      return showPopup({
        type: "error",
        title: "Konfirmasi tidak sama",
        message: "Konfirmasi password tidak cocok.",
        okText: "Periksa",
        onOk: closePopup,
      });
    }

    setLoading(true);
    try {
      await api.post("/register", {
        name: form.name,
        username: form.username,
        phone: form.phone,
        email: form.email,
        password: form.password,
      });

      showPopup({
        type: "success",
        title: null,
        message: "Akun Anda berhasil dibuat!",
        okText: "Go to login",
        onOk: () => {
          closePopup();
          navigate("/login");
        },
      });
    } catch (e2) {
      const p = parseAuthError(e2);
      showPopup({
        ...p,
        okText: p.title === "Email sudah terdaftar" ? "Daftar Ulang" : "Periksa",
        onOk: closePopup,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 position-relative">
      <div className="text-end mb-3">
        <img
          src={logo_lolacake}
          alt="Lola Cake logo"
          style={{width: 150 }}
        />
      </div>

      <div
        className="mx-auto p-4 p-md-5"
        style={{
          maxWidth: 720,
          background: "#fdecb6",
          borderRadius: 24,
        }}
      >
        <h1
          className="text-center fw-bold"
          style={{ color: "#3d231d", fontSize: 48 }}
        >
          Sign Up
        </h1>
        <p className="text-center mt-2">
          Already have account? <Link to="/login">Log in Here</Link>
        </p>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Name*</label>
            <input
              name="name"
              className="form-control rounded-3"
              value={form.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username*</label>
            <input
              name="username"
              className="form-control rounded-3"
              value={form.username}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nomor HP*</label>
            <input
              name="phone"
              type="tel"
              className="form-control rounded-3"
              value={form.phone}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email*</label>
            <input
              name="email"
              type="email"
              className="form-control rounded-3"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password*</label>
            <input
              name="password"
              type="password"
              className="form-control rounded-3"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password*</label>
            <input
              name="confirm"
              type="password"
              className="form-control rounded-3"
              value={form.confirm}
              onChange={onChange}
            />
          </div>

          <button
            className="btn w-100"
            style={{ background: "#f08b2d", color: "#fff" }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign up"}
          </button>
        </form>
      </div>
      <Popup {...popup} />
    </div>
  );
}
