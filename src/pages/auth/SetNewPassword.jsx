import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const { state } = useLocation(); // { email, code }
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const [popup, setPopup] = useState({ open: false });
  const showPopup = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      return showPopup({
        type: "error",
        message: "Semua field wajib diisi.",
        okText: "Go to login",
        onOk: () => { closePopup(); navigate("/login"); }
      });
    }
    if (password !== confirm) {
      return showPopup({
        type: "error",
        message: "Kata sandi tidak cocok",
        okText: "Go to login",
        onOk: () => { closePopup(); navigate("/login"); }
      });
    }

    // TODO: panggil API reset password

    showPopup({
      type: "success",
      message: "Kata sandi berhasil diperbarui.\nAnda sekarang dapat masuk",
      okText: "Go to login",
      onOk: () => { closePopup(); navigate("/login"); }
    });
  };

  return (
    <div className="container py-5">
      <div className="mx-auto p-4 p-md-5" style={{ maxWidth: 720, background: "#fdecb6", borderRadius: 24 }}>
        <h1 className="text-center fw-bold" style={{ color: "#3d231d", fontSize: 42 }}>Set a New Password</h1>
        <p className="text-center text-muted mb-4">
          Create a new password. Ensure it differs from previous one for security.
        </p>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Password*</label>
            <input
              className="form-control rounded-3"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password*</label>
            <input
              className="form-control rounded-3"
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPw"
              checked={show}
              onChange={() => setShow(!show)}
            />
            <label className="form-check-label" htmlFor="showPw">
              Show Password
            </label>
          </div>

          <button className="btn w-100" style={{ background: "#f08b2d", color: "#fff" }}>
            Save Password
          </button>
        </form>
      </div>

      <Popup {...popup} />
    </div>
  );
}
